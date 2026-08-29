import { rootTypeDefs } from "./root.typeDefs";
import { eventTypeDefs } from "./event.typeDefs";

export const typeDefs = [rootTypeDefs, eventTypeDefs];

export const buildSchemaString = (): string => {
  return typeDefs.join("\n");
};
