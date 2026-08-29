import mongoose, { Document, Model, Schema } from "mongoose";
import { EventGraphQL } from "../../types";

export interface IEventDocument extends Document {
  title: string;
  description: string;
  price: number;
  date: Date;
}

const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventModel: Model<IEventDocument> =
  (mongoose.models.Event as Model<IEventDocument>) ||
  mongoose.model<IEventDocument>("Event", eventSchema);

export const eventToGQL = (doc: IEventDocument): EventGraphQL => ({
  _id: doc._id.toString(),
  title: doc.title,
  description: doc.description,
  price: doc.price,
  date: doc.date.toISOString(),
});
