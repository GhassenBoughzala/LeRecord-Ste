const mongoose = require("mongoose");

const FournisseurSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("Fournisseur", FournisseurSchema);
