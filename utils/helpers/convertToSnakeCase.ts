export const convertToSnakeCase = (input: unknown): unknown => {
  console.log("input", input);
  if (input === null || input === undefined) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => convertToSnakeCase(item));
  }

  if (typeof input === "object" && input.constructor === Object) {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(
      input as Record<string, unknown>
    )) {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      result[snakeKey] = convertToSnakeCase(value);
    }

    return result;
  }

  return input;
};
