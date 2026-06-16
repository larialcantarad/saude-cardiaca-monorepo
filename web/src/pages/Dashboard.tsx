import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import TopBar from '../components/TopBar';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <IonPage>
      <TopBar titulo="Acompanhamento Cardíaco" />
      <IonContent className="custom-background">
        <div style={{ padding: '20px' }}>
          <h2>Painel do Paciente</h2>
          <p style={{ color: '#666', textAlign: 'center' }}>Aqui ficarão as telas da Larissa e Helena.</p>
          
          <IonButton expand="block" routerLink="/acompanhamento/novo" className="custom-button" style={{ marginTop: '20px' }}>
            + Novo Acompanhamento (Larissa)
          </IonButton>
          <IonButton 
            expand="block" 
            color="danger" 
            style={{ marginTop: '20px' }}
            onClick={() => {
              localStorage.removeItem('token'); // Apaga o token do navegador
              onLogout(); // Volta pra tela de Login
            }}
          >
            Sair (Logout)
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
