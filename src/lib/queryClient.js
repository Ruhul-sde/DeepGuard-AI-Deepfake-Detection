import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await apiRequest("GET", queryKey[0]);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
    },
  },
});

export async function apiRequest(method, url, data) {
  const config = {
    method,
    headers: {},
  };

  if (data instanceof FormData) {
    config.body = data;
  } else if (data) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return response;
}