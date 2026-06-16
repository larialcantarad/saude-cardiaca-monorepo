import { API_BASE_URL } from './api';

const TOKEN_KEY = 'token';

export interface LoginData {
  email: string;
  senha: string;
}

async function login(data: LoginData): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      throw new Error('Email ou senha incorretos.');
    }
    throw new Error('Erro ao tentar fazer login. Tente novamente.');
  }

  const token = await response.text();
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function isAuthenticated(): boolean {
  return !!getToken();
}

const authService = { login, logout, getToken, isAuthenticated };
export default authService;
