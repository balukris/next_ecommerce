import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 100 },
    },
  });
}

let browserQueryCLient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryCLient) browserQueryCLient = makeQueryClient();
    return browserQueryCLient;
  }
}
