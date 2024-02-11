import express from "express";
import authRouter from "./routes/auth.route";
import boardRouter from "./routes/board.route";
// import session from "express-session";
import cors from "cors";

const app = express();

// declare module "express-session" {
//   interface SessionData {
//     userId: string;
//   }
// }

// app.use(
//   session({
//     secret: "auth-session-secret",
//     resave: false,
//     saveUninitialized: false,
//     name: "auth-session",
//     cookie: {
//       domain: "http://localhost:5173",
//       maxAge: 1 * 60 * 60 * 1000,
//     },
//   })
// );

// custom.d.ts

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", boardRouter);

app.listen(5000);
