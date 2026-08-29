export interface BaseGraphQLType {
  _id: string;
}

export interface EventGraphQL extends BaseGraphQLType {
  title: string;
  description: string;
  price: number;
  date: string;
}

export interface EventInput {
  title: string;
  description: string;
  price: number;
  date: string;
}

export type CreateEventArgs = {
  eventInput: EventInput;
};
