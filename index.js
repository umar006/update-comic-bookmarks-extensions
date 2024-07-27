import cors from "cors";
import "dotenv/config";
import express from "express";
import { mangasFromAsura, mangasFromLuminous } from "./services.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/asura", async (req, res) => {
  const { s } = req.query;
  console.log(s);
  const manga = await mangasFromAsura(s);

  res.json({ data: manga });
});

app.get("/luminous", async (req, res) => {
  const { s } = req.query;
  const mangas = await mangasFromLuminous(s);

  res.json({ data: mangas });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
