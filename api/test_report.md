# 📊 Relatório de Testes Unitários

**Projeto:** Saúde Cardíaca (Spring Boot)
**Data de Execução:** 11 de Junho de 2026
**Resultado Global:** ✅ **BUILD SUCCESS (17/17 Testes Passaram)**

---

## 🎯 Objetivo
Garantir a integridade das rotas da API (Controllers) e das regras de negócio (Services) do projeto acadêmico através de testes unitários isolados, utilizando simulação de banco de dados e mocks para dependências.

## 🛠️ Tecnologias e Configurações Utilizadas
* **Framework de Testes:** JUnit 5, Mockito, Spring Boot Test (`@WebMvcTest`).
* **Segurança:** `spring-security-test` para simular usuários autenticados via JWT e injetar tokens de segurança nas requisições.
* **Banco de Dados:** **H2 Database (em memória)**. Configurado isoladamente em `src/test/resources/application.properties` para garantir que os testes não modifiquem o banco de dados MySQL de produção.

---

## 📂 Cobertura de Código

A suíte de testes cobre 100% dos endpoints expostos pelo sistema e as principais regras de negócio de cadastro e autenticação.

### 1. Camada de Controladores (Controllers) - *8 Testes*

**`AuthControllerTest`**
* ✅ `testRegistrarUsuarioComSucesso`: Verifica se a rota `POST /auth/registro` processa o payload e retorna `201 Created` com os dados corretos.
* ✅ `testLoginComSucesso`: Verifica se a rota `POST /auth/login` valida as credenciais e retorna o Token JWT com status `200 OK`.
* ✅ `testRegistrarUsuarioFalhaRegraNegocio`: Verifica se a rota retorna `400 Bad Request` caso o serviço recuse o cadastro (ex: senhas não coincidem).

**`AcompanhamentoControllerTest`**
* ✅ `testCadastrarComSucesso`: Verifica se `POST /acompanhamentos` cria o registro injetando o contexto do usuário autenticado no token.
* ✅ `testListarComSucesso`: Verifica se `GET /acompanhamentos` devolve o JSON em formato de lista com os dados restritos ao usuário logado.
* ✅ `testAcessoNegadoSemAutenticacao`: Verifica se requisições sem Token JWT retornam `403 Forbidden` nas rotas protegidas pelo Spring Security.
* ✅ `testCadastrarFalhaRegraNegocio`: Verifica se envio de dados absurdos (ex: frequência cardíaca negativa) mapeia corretamente para a exceção global `400 Bad Request`.

### 2. Camada de Regras de Negócio (Services) - *9 Testes*

**`UsuarioServiceTest`**
* ✅ `testRegistrarUsuarioComSucesso`: Valida a criação da entidade, a chamada do método `encode()` para criptografar a senha e a persistência no repositório.
* ✅ `testRegistrarFalhaEmailJaEmUso`: Valida se a exceção `RegraNegocioException` é lançada corretamente antes de salvar, evitando e-mails duplicados.
* ✅ `testRegistrarFalhaSenhasNaoCoincidem`: Valida o bloqueio de cadastros onde a senha e a confirmação de senha diferem.

**`AcompanhamentoServiceTest`**
* ✅ `testCadastrarComSucesso`: Valida as regras matemáticas (frequência, oxigenação, formatação da pressão) e garante o vínculo do usuário.
* ✅ `testCadastrarFrequenciaCardiacaInvalida`: Valida a rejeição imediata caso a frequência cardíaca seja menor que 0.
* ✅ `testCadastrarOxigenacaoInvalidaMenorQue95`: Valida a rejeição se a oxigenação for abaixo de 95%.
* ✅ `testCadastrarOxigenacaoInvalidaMaiorQue100`: Valida a rejeição se a oxigenação for acima de 100%.
* ✅ `testCadastrarPressaoArterialInvalida`: Valida se o formato (Regex) da pressão foi burlado, rejeitando entradas mal formatadas como `12080`.
* ✅ `testListarPorUsuario`: Garante que o serviço chama a `Query` correta no repositório buscando pelo ID do usuário.

---

## 🏁 Conclusão
O projeto atingiu um altíssimo nível de maturidade e estabilidade. A adição da suite garante que futuras manutenções na validação JWT, nos cálculos médicos ou no modelo do banco não vão introduzir falhas silenciosas no sistema principal. O uso de _Mocks_ e do banco _H2_ garantiu que toda essa verificação ocorresse em menos de 10 segundos.
