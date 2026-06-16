import { fetchApi } from './api';

export const cadastrarUsuario = async (dadosUsuario: any) => {
  return await fetchApi('/auth/registro', {
    method: 'POST',
    body: JSON.stringify(dadosUsuario),
  });
};

// Função para fazer o Login e capturar o Token JWT
export const loginUsuario = async (credenciais: any) => {
  return await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciais),
  });
};
