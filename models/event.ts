import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  date: Date,
});

export default mongoose.model("Event", schema);