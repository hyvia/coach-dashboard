import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@/stores/authStore';

const endpoint = import.meta.env.VITE_APPSYNC_URL;

const client = new GraphQLClient(endpoint || 'http://localhost:4000/graphql');

export async function gqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = useAuthStore.getState().token;
  return client.request<T>(query, variables, {
    Authorization: token ?? '',
  });
}
