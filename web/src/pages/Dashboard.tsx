import { IonContent, IonPage, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logOutOutline, addOutline, listOutline } from 'ionicons/icons';
import TopBar from '../components/TopBar';
import { fetchApi } from '../services/api';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [totalRegistros, setTotalRegistros] = useState<number | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState('Paciente');

  useIonViewWillEnter(() => {
    fetchApi('/acompanhamentos')
      .then((data) => {
        if (Array.isArray(data)) setTotalRegistros(data.length);
      })
      .catch(() => setTotalRegistros(0));

    const nome = localStorage.getItem('nomeUsuario');
    if (nome) setNomeUsuario(nome.replace(/['"]+/g, ''));
  });

  return (
    <IonPage>
      <TopBar titulo="Painel do Paciente" />
      <IonContent className="custom-background">
        <div className="container-center">

          <div className="custom-card fade-in-card" style={{ width: '100%', maxWidth: '500px', padding: '30px 25px', textAlign: 'center' }}>

            {/* Saudação */}
            <h2 className="custom-title" style={{ marginTop: 0, fontSize: '1.5rem' }}>
              Olá, {nomeUsuario}!
            </h2>
            <p style={{ color: '#888', fontSize: '0.95rem', marginTop: '-5px', marginBottom: '25px' }}>
              Bem-vindo ao sistema de acompanhamento cardíaco.
            </p>

            {/* Contador de registros */}
            {totalRegistros !== null && (
              <div style={{
                backgroundColor: '#f0f4f8',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sus-blue)' }}>
                  {totalRegistros}
                </span>
                <span style={{ color: '#666', fontSize: '0.95rem', textAlign: 'left' }}>
                  {totalRegistros === 1 ? 'registro\ncadastrado' : 'registros\ncadastrados'}
                </span>
              </div>
            )}

            {/* Ações rápidas */}
            <IonButton
              expand="block"
              routerLink="/acompanhamento/novo"
              className="custom-button"
              style={{ marginBottom: '12px' }}
            >
              <IonIcon icon={addOutline} slot="start" />
              Novo Acompanhamento
            </IonButton>

            <IonButton
              expand="block"
              routerLink="/acompanhamentos"
              fill="outline"
              style={{ marginBottom: '12px', '--border-color': 'var(--sus-blue)', '--color': 'var(--sus-blue)', fontWeight: 'bold' }}
            >
              <IonIcon icon={listOutline} slot="start" />
              Ver Meus Registros
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              style={{ marginTop: '10px', '--color': '#d9534f', fontWeight: '600' }}
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('nomeUsuario');
                onLogout();
              }}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Sair da Conta
            </IonButton>

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
