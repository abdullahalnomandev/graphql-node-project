export const eventTypeDefs = `
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  extend type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): Event!
    updateEvent(id: ID!, eventInput: EventInput!): Event
    deleteEvent(id: ID!): Boolean
  }
`;
