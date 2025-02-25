const express = require("express");
const userRoute = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    “It always seems impossible, until its done” \n
                -Nelson Mandela 
    `);
});

router.use("/", userRoute);


module.exports = router;
