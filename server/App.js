if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const index = require("./routers/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", index);

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = app;
