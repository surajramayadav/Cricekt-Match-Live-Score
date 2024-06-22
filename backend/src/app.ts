
import express from "express";
const app = express();
import errorMiddleware from "./middleware/error";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
const user = require("./routes/userRoute")
const userAuth = require("./routes/userAuthRoute")
const scrape = require("./routes/scrapeRoute")
const match = require("./routes/matchRoute")


const corsOptions = {
  // origin: "http://localhost:8081",
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: false }));
app.use(express.static((path.join(__dirname, "../public/images/"))));

app.use("/api/v1/user", user)
app.use("/api/v1/user/auth", userAuth)
app.use("/api/v1/scrape", scrape)
app.use("/api/v1/match", match)

// app.get("/logo", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/images/logo.jpg"));
// });

app.get("/", (req, res) => {
  res.send('Working...');
});

// Middleware For error
app.use(errorMiddleware);

export default app
