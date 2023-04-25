const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

const connectDB = require("./Configs/config");
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/item", require("./routes/itemRouter"));
app.use("/api/supplier", require("./routes/supplierRouter"));
app.use("/api/rawmaterial", require("./routes/rawMatRouter"));
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
