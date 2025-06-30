export const convertToCamelCase = (input: unknown): unknown => {
  if (input === null || input === undefined) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => convertToCamelCase(item));
  }

  if (typeof input === "object" && input.constructor === Object) {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(
      input as Record<string, unknown>
    )) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      result[camelKey] = convertToCamelCase(value);
    }

    return result;
  }

  return input;
};
