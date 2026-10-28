import express from "express";
import { ENV } from "./config/env.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import notificationRoute from "./routes/notification.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

app.get("/", (req, res) => res.send("hello from server"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRout);

// error handling middleware
app.use((err, req, res, next) => {
	console.error("unhandled error", err);
	res.status(500).json({ error: "internal server error" });
});

const startServer = async () => {
	try {
		await connectDB();
		//Listen for local Development
		if (ENV.NODE_ENV !== "production") {
			app.listen(ENV.PORT, () =>
				console.log(`server is up and running on PORT: ${ENV.PORT} `),
			);
		}
	} catch (error) {
		console.error("failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
// export for vercel
export default app;
