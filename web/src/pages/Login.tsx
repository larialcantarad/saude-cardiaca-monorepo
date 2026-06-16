import { useState } from 'react';
import { IonPage, IonContent, IonIcon, IonSpinner, IonRouterLink } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import authService from '../services/auth.service';
import TopBar from '../components/TopBar';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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
      localStorage.setItem('nomeUsuario', email.split('@')[0]); // Salva o nome do email
      if (onLogin) onLogin();
      history.replace('/dashboard');
    } catch (err: any) {
      setErro(err.message || 'Erro ao fazer login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <IonPage>
      <TopBar titulo="Acesso ao Sistema" />
      <IonContent className="custom-background">
        <div className="container-center">
          <div className="custom-card fade-in-card" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="custom-title" style={{ marginTop: 0, textAlign: 'center' }}>Login</h2>

            <form onSubmit={handleLogin} noValidate className="custom-form">
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div className="password-container" style={{ marginBottom: '15px' }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="custom-input"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <IonIcon 
                  icon={mostrarSenha ? eyeOffOutline : eyeOutline} 
                  className="password-icon"
                  onClick={() => setMostrarSenha((v) => !v)} 
                />
              </div>

              {erro && <p className="login-erro">{erro}</p>}

              <button type="submit" className="custom-button" disabled={carregando} style={{ width: '100%', marginTop: '10px' }}>
                {carregando ? <IonSpinner name="crescent" /> : 'Entrar'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
              Ainda não possui cadastro?{' '}
              <IonRouterLink routerLink="/cadastro" style={{ color: 'var(--sus-blue)', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se aqui</IonRouterLink>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
