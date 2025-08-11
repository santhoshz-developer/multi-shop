import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api";

const getBearerToken = (): string => {
  const token = Cookies.get("token") || "";
  return `Bearer ${token}`;
};

// ✅ GET (single or paginated list)
export const fetchData = async <T>(
  endpoint: string,
  queryParams?: Record<string, string | number | boolean | undefined>
): Promise<T> => {
  const url = new URL(`${API_URL}${endpoint}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: getBearerToken(),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `Error: ${response.statusText}`);
  }

  return response.json();
};


// ✅ POST (JSON data)
export const postData = async <T>(
  endpoint: string,
  data: unknown
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

// ✅ PUT / PATCH (update)
export const updateData = async <T>(
  endpoint: string,
  data: unknown,
  method: "PUT" | "PATCH" = "PUT"
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

// ✅ DELETE
export const deleteData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: getBearerToken(),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

// ✅ POST FormData (upload file)
export const uploadFileData = async <T>(
  endpoint: string,
  formData: FormData
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: getBearerToken(),
      // ⚠️ Do NOT set Content-Type for FormData — browser sets it automatically
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.message || `Error uploading file: ${response.statusText}`
    );
  }

  return response.json();
};
