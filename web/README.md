# Front-End: Saúde Cardíaca 🫀

Este é o aplicativo Mobile/Front-End oficial do sistema de Saúde Cardíaca, construído utilizando **React**, **Ionic Framework** e **TypeScript**.

## 👥 Equipe
- Julia Ferreira Barcelos Tagliari
- Larissa Alcantara
- Luiza Helena Filipe Lustosa da Costa
- Victor Hugo Candido Malvão

## 🛠 Tecnologias Utilizadas
- **Ionic React** (Navegação suave, Componentes mobile nativos)
- **Vite** (Build ultra-rápido)
- **CSS** (Estilização com tema e paleta de cores global)
- **Capacitor** (Geração do APK nativo)

## 🚀 Como Rodar o Projeto na Sua Máquina

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (Recomendamos a versão LTS)
- O `npm` que já vem junto com o Node.

### 2. Instalando as Dependências
Abra o terminal dentro desta pasta (`web`) e rode o comando:
```bash
npm install
```

### 3. Configurando a Conexão com o Back-end
O aplicativo se comunica com o Spring Boot através de uma API. 
Para que a comunicação funcione, você deve informar ao aplicativo o endereço onde o Java está rodando:
1. Abra o arquivo `src/services/api.ts`.
2. Altere o valor da constante `API_BASE_URL` na primeira linha.
   - **Para rodar no navegador do PC:** Deixe `http://localhost:8081`
   - **Para rodar no Celular (APK):** Troque pelo Endereço IPv4 da sua máquina na sua rede Wi-Fi (Ex: `http://192.168.0.x:8081`)

### 4. Rodando o Aplicativo (Modo de Desenvolvimento)
Para abrir o aplicativo e testar no navegador do seu PC com recarregamento instantâneo, rode:
```bash
npm run dev
```
O aplicativo abrirá no seu navegador. É recomendado utilizar o DevTools (F12) e ativar o **Modo Dispositivo (Celular)** para a melhor experiência visual.

## 📱 Gerando o APK (Android)
*(As instruções do Capacitor para geração do APK final serão consolidadas nesta seção após a integração de todas as telas).*
