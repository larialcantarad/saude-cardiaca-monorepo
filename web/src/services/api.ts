// IMPORTANTE: Troque 'http://localhost:8081' pelo IP da sua máquina (ex: http://192.168.0.x:8081) quando for rodar no celular!
export const API_BASE_URL = 'http://localhost:8081';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  // Pega o token salvo no armazenamento do navegador
  let token = localStorage.getItem('token');
  
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Se tivermos um token guardado, injetamos ele em todas as requisições pro Back-end!
  if (token) {
    token = token.replace(/['"]+/g, ''); // Limpa possíveis aspas que o navegador possa ter salvo
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Erro na API: ${response.statusText}`;
    try {
      const clonedResponse = response.clone();
      const errorBody = await clonedResponse.json();
      if (errorBody.message || errorBody.erro) {
        errorMessage = errorBody.message || errorBody.erro;
      }
    } catch (e) {
      const errorText = await response.text();
      if (errorText) errorMessage = errorText;
    }
    throw new Error(errorMessage);
  }

  // Lendo a resposta
  const text = await response.text();
  if (!text) return {};
  
  try {
    return JSON.parse(text); // Tenta converter para objeto/JSON
  } catch (e) {
    return text; // Se for só uma string pura (como o Token JWT), retorna ela direto
  }
};
