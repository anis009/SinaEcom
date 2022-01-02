import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import {
	errorHandler,
	notFound,
} from "../backend/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json());

app.use("/api/users/", userRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${PORT} 🔥🔥🔥🚀🚀`
			.yellow.bold
	)
);
