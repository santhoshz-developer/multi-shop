export function createResponse<T>(
  status: number,
  message: string,
  data?: T,
  pagination?: Partial<{
    totalCount: number;
    page: number | string;
    limit: number | string;
    totalPages: number;
  }>
) {
  return { status, message, data, pagination };
}
