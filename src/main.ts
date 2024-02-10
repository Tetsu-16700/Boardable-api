import expres from "express";

const app = expres();

app.use(express.json());

app.use("/api", authRouter);

app.use("/api", boardRouter);

app.listen(5000);