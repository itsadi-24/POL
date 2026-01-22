const API_BASE_URL = "http://localhost:3001";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    return { data: null, error: `Error: ${response.status} ${response.statusText}` };
  }
  const data = await response.json();
  return { data, error: null };
}

export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}

export async function patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}


export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
    });
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: "Network error. Please check if the server is running." };
  }
}
