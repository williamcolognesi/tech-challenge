export const API_URL = process.env.API_URL ?? 'http://localhost:8080/api';

export class ApiUnavailableError extends Error {
  constructor() {
    super('A API não está disponível. Verifique se o servidor está em execução.');
    this.name = 'ApiUnavailableError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...(!isFormData && { headers: { 'Content-Type': 'application/json' } }),
      ...init,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API error ${res.status}: ${error}`);
    }

    if (res.status === 204) return undefined as T;
    return res.json();
  } catch (err) {
    if (err instanceof ApiUnavailableError || err instanceof Error && err.message.startsWith('API error')) {
      throw err;
    }
    throw new ApiUnavailableError();
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  postFile: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: 'POST', body: formData }),
  putFile: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: 'PUT', body: formData }),
  delete: (path: string) => request<void>(path, { method: 'DELETE' }),
};
