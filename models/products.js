const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

productSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Products", productSchema);
