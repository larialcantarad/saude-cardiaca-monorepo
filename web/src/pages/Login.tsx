import { useState } from 'react';
import { IonPage, IonContent, IonIcon, IonSpinner } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import authService from '../services/auth.service';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha o email e a senha.');
      return;
    }
    if (!emailValido(email)) {
      setErro('Informe um email válido.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      await authService.login({ email, senha });
      history.replace('/home');
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-titulo">Login</h2>

            <form onSubmit={handleLogin} noValidate>
              <div className="login-field">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="login-field">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-senha"
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <IonIcon icon={mostrarSenha ? eyeOffOutline : eyeOutline} />
                </button>
              </div>

              {erro && <p className="login-erro">{erro}</p>}

              <button type="submit" className="login-btn" disabled={carregando}>
                {carregando ? <IonSpinner name="crescent" /> : 'Entrar'}
              </button>
            </form>

            <p className="login-cadastro-link">
              Ainda não possui cadastro?{' '}
              <a href="/cadastro">Cadastre-se aqui</a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
