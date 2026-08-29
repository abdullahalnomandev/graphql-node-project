import { EventModel, eventToGQL } from "../../models/event/event.model";
import { CreateEventArgs, EventGraphQL } from "../../types";

export const eventResolvers = {
  Query: {
    events: async (): Promise<EventGraphQL[]> => {
      const docs = await EventModel.find().sort({ date: -1 });
      return docs.map(eventToGQL);
    },

    event: async (
      _root: unknown,
      args: { id: string },
    ): Promise<EventGraphQL | null> => {
      const doc = await EventModel.findById(args.id);
      return doc ? eventToGQL(doc) : null;
    },
  },

  Mutation: {
    createEvent: async (
      _root: unknown,
      args: CreateEventArgs,
    ): Promise<EventGraphQL> => {
      const doc = new EventModel({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: Number(args.eventInput.price),
        date: new Date(args.eventInput.date),
      });
      const saved = await doc.save();
      return eventToGQL(saved);
    },

    updateEvent: async (
      _root: unknown,
      args: { id: string; eventInput: CreateEventArgs["eventInput"] },
    ): Promise<EventGraphQL | null> => {
      const updated = await EventModel.findByIdAndUpdate(
        args.id,
        {
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: Number(args.eventInput.price),
          date: new Date(args.eventInput.date),
        },
        { new: true, runValidators: true },
      );
      return updated ? eventToGQL(updated) : null;
    },

    deleteEvent: async (
      _root: unknown,
      args: { id: string },
    ): Promise<boolean> => {
      const result = await EventModel.findByIdAndDelete(args.id);
      return !!result;
    },
  },
};
