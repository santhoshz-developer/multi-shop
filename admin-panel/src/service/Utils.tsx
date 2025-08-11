// Formats a date string to "YYYY-MM-DD"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

/**
 * Generate a URL with query parameters from a base URL and parameters object.
 * @param baseUrl - The base URL.
 * @param params - An object containing query parameters.
 * @returns The complete URL with encoded query parameters.
 */
export const generateUrlWithParams = (
  baseUrl: string,
  params?: Record<string, string | number | boolean>
): string => {
  const filteredParams = params
    ? Object.entries(params)
        .filter(([, value]) => value !== null && value !== undefined)
        .reduce<Record<string, string | number | boolean>>(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {}
        )
    : {};

  const stringifiedParams = Object.entries(filteredParams).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {});

  return `${baseUrl}?${new URLSearchParams(stringifiedParams).toString()}`;
};

// Current date in "YYYY-MM-DD" format
export const currentDate: string = new Date().toISOString().split("T")[0];
