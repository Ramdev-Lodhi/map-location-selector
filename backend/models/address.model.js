const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    houseNo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Home", "Office", "Friends & Family"],
      default: "Home",
    },
  },
  {
    timestamps: true,
  }
);
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
