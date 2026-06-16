import {
  IonContent,
  IonPage,
  IonToast,
  useIonRouter,
  IonIcon
} from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import './Cadastro.css';
import { cadastrarUsuario, loginUsuario } from '../services/userService';
import TopBar from '../components/TopBar';

interface CadastroProps {
  onLogin?: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onLogin }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [paisResidencia, setPaisResidencia] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estados para controle de visibilidade da senha
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useIonRouter();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validador de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage('Por favor, insira um e-mail válido.');
      setShowToast(true);
      return;
    }

    // Validador de Telefone (aceita apenas números e verifica se tem 10 ou 11 dígitos)
    const telefoneLimpo = numeroTelefone.replace(/\D/g, ''); // Remove tudo que não for número
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setToastMessage('Telefone inválido. Insira DDD + Número.');
      setShowToast(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setToastMessage('As senhas não coincidem!');
      setShowToast(true);
      return;
    }

    // Validador simples de tamanho de senha (opcional, mas recomendado)
    if (senha.length < 6) {
      setToastMessage('A senha deve ter pelo menos 6 caracteres.');
      setShowToast(true);
      return;
    }

    try {
      const payload = {
        nome,
        sobrenome,
        email,
        numeroTelefone: telefoneLimpo, // Envia limpo pro backend
        senha,
        confirmarSenha,
        dataNascimento,
        sexo,
        paisResidencia
      };

      await cadastrarUsuario(payload);
      
      // LOGA AUTOMATICAMENTE APÓS O CADASTRO!
      const token = await loginUsuario({ email, senha });
      localStorage.setItem('token', token); // Salva a chave do cofre

      setToastMessage('Cadastro realizado com sucesso! Redirecionando...');
      setShowToast(true);
      
      // Limpar formulário e redirecionar
      setTimeout(() => {
        setNome(''); setSobrenome(''); setEmail(''); setNumeroTelefone('');
        setDataNascimento(''); setSexo(''); setPaisResidencia(''); 
        setSenha(''); setConfirmarSenha('');
        if (onLogin) onLogin(); // Muda o estado global para "Autenticado"
        router.push('/dashboard', 'root', 'replace');
      }, 1500);

    } catch (error: any) {
      console.error(error);
      setToastMessage(error.message || 'Erro ao realizar cadastro. Tente novamente.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <TopBar titulo="Novo Usuário" mostrarVoltar={true} />
      <IonContent className="custom-background">
        <div className="container-center">
          <div className="custom-card">
            <h1 className="custom-title">Cadastro de Usuário</h1>
            
            <form onSubmit={handleCadastro} className="custom-form">
              <input
                type="text" placeholder="Nome" className="custom-input"
                value={nome} onChange={(e) => setNome(e.target.value)} required
              />
              
              <input
                type="text" placeholder="Sobrenome" className="custom-input"
                value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required
              />
              
              <input
                type="email" placeholder="E-mail" className="custom-input"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />

              <input
                type="tel" placeholder="Telefone (ex: 11999999999)" className="custom-input"
                value={numeroTelefone} onChange={(e) => setNumeroTelefone(e.target.value)} required
              />

              <input
                type="date" placeholder="Data de Nascimento" className="custom-input"
                value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required
              />

              <select className="custom-input custom-select" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                <option value="" disabled>Selecione o Sexo</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
              </select>

              <input
                type="text" placeholder="País de Residência" className="custom-input"
                value={paisResidencia} onChange={(e) => setPaisResidencia(e.target.value)} required
              />
              
              <div className="password-container">
                <input
                  type={showSenha ? "text" : "password"} placeholder="Senha" className="custom-input"
                  value={senha} onChange={(e) => setSenha(e.target.value)} required
                />
                <IonIcon 
                  icon={showSenha ? eyeOffOutline : eyeOutline} 
                  className="password-icon" 
                  onClick={() => setShowSenha(!showSenha)} 
                />
              </div>

              <div className="password-container">
                <input
                  type={showConfirmarSenha ? "text" : "password"} placeholder="Confirmar Senha" className="custom-input"
                  value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required
                />
                <IonIcon 
                  icon={showConfirmarSenha ? eyeOffOutline : eyeOutline} 
                  className="password-icon" 
                  onClick={() => setShowConfirmarSenha(!showConfirmarSenha)} 
                />
              </div>

              <button type="submit" className="custom-button">
                Cadastrar
              </button>
            </form>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
          cssClass="custom-toast"
        />
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
