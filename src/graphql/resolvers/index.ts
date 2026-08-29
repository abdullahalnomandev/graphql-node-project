import { eventResolvers } from "./event.resolvers";

type ResolverMap = Record<string, Record<string, unknown>>;

const moduleResolvers = [eventResolvers];

export const mergeResolvers = (resolvers: ResolverMap[]): ResolverMap => {
  const merged: ResolverMap = {};
  for (const r of resolvers) {
    for (const key of Object.keys(r)) {
      merged[key] = { ...(merged[key] || {}), ...(r[key] || {}) };
    }
  }
  return merged;
};

export const resolvers = mergeResolvers(moduleResolvers);

type StandardResolver = (
  parent: unknown,
  args: Record<string, unknown>,
  context: unknown,
  info: unknown,
) => unknown;

export const buildRootValue = (): Record<string, unknown> => {
  const root: Record<string, unknown> = {};
  for (const key of Object.keys(resolvers)) {
    if (key === "Query" || key === "Mutation") {
      const typeResolvers = resolvers[key] as Record<string, StandardResolver>;
      for (const field of Object.keys(typeResolvers)) {
        const resolver = typeResolvers[field];
        root[field] = (
          args: Record<string, unknown>,
          context: unknown,
          info: unknown,
        ) => resolver(undefined, args, context, info);
      }
    }
  }
  return root;
};
