export function http(url:string, options?: RequestInit): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
}