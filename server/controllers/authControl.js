import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- Helper Function to Format User Data for API Responses ---
// This centralizes logic to ensure a consistent and secure user object is always returned.
const formatUserForResponse = (userDoc) => {
  const user = userDoc.toObject(); // Convert Mongoose document to a plain object

  // The avatar field should store the full URL from your cloud provider (e.g., Cloudinary).
  // No need to construct a URL with BASE_URL.
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || null,
  };
};

// --- Token Generation ---
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d', // For production, consider a shorter lifespan and a refresh token strategy
    },
  );
};

// --- Controller Functions ---

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' }); // 409 Conflict is more specific
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    res.status(201).json({ message: 'Signup successful, please login' });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'An unexpected error occurred during signup' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Best practice: Assume password has `select: false` in the schema and explicitly request it.
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for security
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    const userResponse = formatUserForResponse(user);

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('SignIn Error:', error.message);
    res.status(500).json({ message: 'An unexpected error occurred during sign-in' });
  }
};

export const logout = async (req, res) => {
  // For stateless JWT, logout is a client-side action (deleting the token).
  // This endpoint simply confirms the action.
  res.json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
  try {
    // req.userId is added by your authentication middleware
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(formatUserForResponse(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    // CRITICAL FIX: Use the full URL path from your cloud storage provider (e.g., Cloudinary).
    // This is provided by `multer-storage-cloudinary` in `req.file.path`.
    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(formatUserForResponse(updatedUser));
  } catch (err)
  {
    console.error(err);
    res.status(500).json({ message: 'Profile update failed' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // This check is good. For larger apps, consider a dedicated `isAdmin` middleware.
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admin rights required' });
    }

    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });

    // Use the helper to format every user in the array
    const formattedUsers = users.map(formatUserForResponse);

    res.json(formattedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}; 

export const user = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const baseUrl = process.env.BASE_URL || "http://localhost:8000";

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user", // fallback if role missing
      avatar: user.avatar ? `${baseUrl}${user.avatar}` : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};