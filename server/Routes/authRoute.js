import { signIn,signUp ,logout,user,updateUserProfile,getAllUsers} from "../controllers/authControl.js";
import {Auth} from "../middleware/auth.js"
import upload from "../config/multer.js";
import express from 'express'
const route=express.Router()

route.post('/signin',signIn)
route.post('/signup',signUp)
route.post("/logout", logout);
route.get("/user",Auth,user)
route.get("/", Auth, getAllUsers);
route.put("/user/update", Auth, upload.single("avatar"), updateUserProfile);




export default route