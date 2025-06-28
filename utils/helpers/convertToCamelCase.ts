export const convertToCamelCase = (input: unknown): unknown => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelKey] = convertToCamelCase(value);
  }

  return result;
};
