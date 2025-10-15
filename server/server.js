import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';

// --- Import your custom modules ---
import { connectDB } from './config/db.js';
import redisClient from './config/redis.js';
import authRoutes from './Routes/authRoute.js';
import productRoutes from './Routes/productRoute.js'
import orderRoutes from './Routes/orderRoute.js';
import wishlistRoutes from './Routes/wishlistRoute.js';
import cartRoutes from './Routes/cartRoute.js';


dotenv.config();

// --- Initialize App and Server ---
const app = express();
const server = http.createServer(app);

// --- Security Middleware ---
app.use(helmet()); // 🔒 Sets various HTTP headers for security

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter); // 🔒 Protects against brute-force attacks

// --- Core Middlewares ---
app.use(
  cors({
    // ✅ Use an environment variable for the production URL
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Socket.io Setup ---
export const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});


app.use('/api/auth', authRoutes);


app.use('/api/products', productRoutes(io));
app.use('/api/orders', orderRoutes(io));

app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);



app.use((err, req, res, next) => {
  console.error('💥 An uncaught error occurred:', err);


  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large.' });
    }
    return res.status(400).json({ message: err.message });
  }


  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

// --- Start Server ---
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log('✅ Redis Connected');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1); // Exit if critical services fail to connect
  }
};

startServer();