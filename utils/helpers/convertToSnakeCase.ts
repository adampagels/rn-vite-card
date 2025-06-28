export const convertToSnakeCase = (input: unknown): unknown => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    result[snakeKey] = convertToSnakeCase(value);
  }

  return result;
};
