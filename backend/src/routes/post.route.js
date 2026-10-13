import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
  createPost,
} from "../controllers/post.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// public routes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

//protected route
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId/delete", protectRoute, deletePost);
export default router;
