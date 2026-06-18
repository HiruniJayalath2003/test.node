import express, { type Request, type Response } from "express";
import movieRouter from "./routes/movie.routes.js";

const app = express(); //create express app
const PORT = 3000;
app.use(express.json());//middleware

app.use("/api",movieRouter); //register the router

app.listen(PORT, () => {
  console.log(`Server is running on ⚡ http://localhost:${PORT}`);
});

