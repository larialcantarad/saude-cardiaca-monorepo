import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonSpinner,
  IonIcon
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { addOutline, heartbeatOutline } from 'ionicons/icons';
import { fetchApi } from '../services/api';
import TopBar from '../components/TopBar';
import './TelaAcompanhamento.css';

interface Acompanhamento {
  id: number;
  pressaoArterial: string;
  frequenciaCardiaca: number;
  nivelOxigenacao: number;
  pesoCorporal: number;
  sintomas: string;
  dataRegistro: string;
}

const TelaAcompanhamento: React.FC = () => {
  const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Carrega os dados reais do Java assim que a tela abrir
  useEffect(() => {
    carregarAcompanhamentos();
  }, []);

  const carregarAcompanhamentos = async () => {
    try {
      const data = await fetchApi('/acompanhamentos');
      setAcompanhamentos(data);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (dataOriginal: string) => {
    if (!dataOriginal) return "";
    const data = new Date(dataOriginal);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <IonPage>
      <TopBar titulo="Acompanhamentos" />
      <IonContent className="custom-background">
        <div className="container-center" style={{ alignItems: 'flex-start', paddingTop: '20px' }}>
          
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px', marginBottom: '15px' }}>
            <h2 className="custom-title" style={{ margin: 0, fontSize: '1.4rem' }}>Meus Registros</h2>
            <IonButton routerLink="/acompanhamento/novo" className="custom-button" style={{ margin: 0 }}>
              <IonIcon icon={addOutline} slot="start" />
              NOVO
            </IonButton>
          </div>

          {carregando ? (
            <div style={{ textAlign: 'center', marginTop: '50px', width: '100%' }}>
              <IonSpinner name="crescent" color="primary" />
              <p style={{ color: '#666' }}>Buscando registros no SUS...</p>
            </div>
          ) : acompanhamentos.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', width: '100%', padding: '20px' }}>
              <IonIcon icon={heartbeatOutline} style={{ fontSize: '64px', color: '#ccc' }} />
              <h3 style={{ color: '#666', marginTop: '10px' }}>Nenhum acompanhamento registrado</h3>
              <p style={{ color: '#999' }}>Clique em NOVO para registrar seus primeiros sinais vitais.</p>
            </div>
          ) : (
            acompanhamentos.map((item) => (
              <IonCard key={item.id} className="custom-card fade-in-card" style={{ width: '100%', maxWidth: '600px', marginBottom: '15px', marginTop: '0' }}>
                <IonCardContent>
                  <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong>Data:</strong> <span style={{ color: 'var(--sus-blue)' }}>{formatarData(item.dataRegistro)}</span>
                  </div>

                  <div className="campo">
                    <span className="titulo">Frequência Cardíaca:</span>
                    <span>{item.frequenciaCardiaca} bpm</span>
                  </div>

                  <div className="campo">
                    <span className="titulo">Oxigenação:</span>
                    <span>{item.nivelOxigenacao}%</span>
                  </div>

                  <div className="campo">
                    <span className="titulo">Peso:</span>
                    <span>{item.pesoCorporal} kg</span>
                  </div>

                  <div className="campo">
                    <span className="titulo">Pressão Arterial:</span>
                    <span>{item.pressaoArterial}</span>
                  </div>

                  {item.sintomas && (
                    <div className="campo" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #eee' }}>
                      <span className="titulo" style={{ color: '#d9534f' }}>Sintomas:</span>
                      <span>{item.sintomas}</span>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            ))
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TelaAcompanhamento;