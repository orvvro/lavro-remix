import { data } from "react-router";

export function timeoutPromise<T>(
  promise: Promise<T>,
  ms: number = 9000
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(data("Request timed out", { status: 408 })), ms)
    ),
  ]);
}
