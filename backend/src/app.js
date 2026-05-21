import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CORS_ORIGIN
];

const app= express()
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


// routes import
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import resumeRouter from "./routes/resume.routes.js"
import jobRouter from "./routes/job.routes.js"
import analyzeRouter from "./routes/analyze.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/resume", resumeRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/analyze", analyzeRouter)


export {app}