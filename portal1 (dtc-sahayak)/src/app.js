import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));  // Ensure the views path is correct

// Routes
app.use("/api/v1/users", userRouter);

// Route to serve index.ejs
app.get("/", (req, res) => {
    res.render("index");  // Renders src/views/index.ejs
});

export { app };
