const mongoose = require("mongoose");
const router = require("../routes/itemRouter");

const itemSchema = new mongoose.Schema({
  itemcode: {
    type: String,
    unique: true,
    required: true,
  },
  itemname: {
    type: String,
    required: true,
  },
  unitprice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  itemimage: {
    type: String,
  },
  itemdescript: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
