const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    price: {
      type: String,
    },
    rating: {
      type: String,
    },
    discount: {
      type: String,
    },

    availibility: {
      type: String,
    },
  },
  (timeStamps = true)
);

const item = mongoose.model("Item", itemSchema);

module.exports = item;
