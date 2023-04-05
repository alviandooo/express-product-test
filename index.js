const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const app = express();
const port = 5007;

const transactionRoutes = require("./routes/transaction");

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// default options
app.use(fileUpload());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({ success: true });
});

app.use("/transaction", transactionRoutes);

app.listen(port, () => {
  console.log(`Success runing server on port ${port}`);
});
