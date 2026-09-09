import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode, ComponentType } from "react";

type Provider = ComponentType<{ children: ReactNode }>;

export const createWrapper = (providers: Provider[] = []) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => {
    const content = providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );

    return (
      <QueryClientProvider client={queryClient}>
        {content}
      </QueryClientProvider>
    );
  };

  return {
    wrapper,
    queryClient,
  };
};