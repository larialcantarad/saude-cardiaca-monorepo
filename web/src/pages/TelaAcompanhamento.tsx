import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonIcon,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { addOutline, pulseOutline, chevronDownCircleOutline } from 'ionicons/icons';
import { fetchApi } from '../services/api';
import TopBar from '../components/TopBar';

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
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Recarrega os dados TODA VEZ que a tela ficar visível (volta de outra aba, etc.)
  useIonViewWillEnter(() => {
    carregarAcompanhamentos();
  });

  const carregarAcompanhamentos = async (event?: any) => {
    try {
      const data = await fetchApi('/acompanhamentos');
      setAcompanhamentos(data);
    } catch (error: any) {
      setToastMessage(error.message || "Erro ao carregar os dados do servidor.");
      setShowToast(true);
    } finally {
      setCarregando(false);
      if (event) event.detail.complete();
    }
  };

  const formatarData = (dataOriginal: string) => {
    if (!dataOriginal) return { data: '', hora: '' };
    const d = new Date(dataOriginal);
    return {
      data: d.toLocaleDateString('pt-BR'),
      hora: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <IonPage>
      <TopBar titulo="Acompanhamentos" />
      <IonContent className="custom-background">

        <IonRefresher slot="fixed" onIonRefresh={carregarAcompanhamentos}>
          <IonRefresherContent pullingIcon={chevronDownCircleOutline} refreshingSpinner="circles" />
        </IonRefresher>

        {/* Container de lista vertical — padding lateral e vertical */}
        <div style={{ padding: '16px', paddingBottom: '40px' }}>

          {/* Header: Título + Botão Novo */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="custom-title" style={{ margin: 0, fontSize: '1.3rem' }}>Meus Registros</h2>
            <IonButton routerLink="/acompanhamento/novo" className="custom-button" size="small" style={{ margin: 0 }}>
              <IonIcon icon={addOutline} slot="start" />
              Novo
            </IonButton>
          </div>

          {/* Estado: Carregando */}
          {carregando && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <IonSpinner name="crescent" color="primary" />
              <p style={{ color: '#666', marginTop: '10px' }}>Buscando registros...</p>
            </div>
          )}

          {/* Estado: Lista vazia */}
          {!carregando && acompanhamentos.length === 0 && (
            <div className="custom-card" style={{ textAlign: 'center', padding: '40px 20px', borderRadius: '12px' }}>
              <IonIcon icon={pulseOutline} style={{ fontSize: '48px', color: 'var(--sus-blue)', opacity: 0.3 }} />
              <h3 style={{ color: '#555', marginTop: '15px', fontSize: '1.05rem' }}>Nenhum registro encontrado</h3>
              <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Toque em "Novo" para registrar sinais vitais.</p>
            </div>
          )}

          {/* Estado: Lista com registros (VERTICAL, um card por vez) */}
          {!carregando && acompanhamentos.length > 0 && acompanhamentos.map((item) => {
            const { data, hora } = formatarData(item.dataRegistro);
            return (
              <div
                key={item.id}
                className="custom-card fade-in-card"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '18px',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  borderLeft: '5px solid var(--sus-blue)',
                  boxSizing: 'border-box'
                }}
              >
                {/* Cabeçalho: Data + Badge de hora */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f0f4f8' }}>
                  <span style={{ fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>{data}</span>
                  <span style={{
                    color: '#fff', fontSize: '0.75rem', fontWeight: '600',
                    backgroundColor: 'var(--sus-blue)', padding: '2px 10px', borderRadius: '20px'
                  }}>
                    {hora}
                  </span>
                </div>

                {/* Sinais vitais — cada um em uma linha */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>Frequência Cardíaca</span>
                  <span style={{ color: 'var(--sus-blue)', fontWeight: 'bold', fontSize: '1rem' }}>
                    {item.frequenciaCardiaca} <small style={{ color: '#aaa' }}>bpm</small>
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>Oxigenação</span>
                  <span style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1rem' }}>
                    {item.nivelOxigenacao}<small style={{ color: '#aaa' }}>%</small>
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>Pressão Arterial</span>
                  <span style={{ color: '#8e44ad', fontWeight: 'bold', fontSize: '1rem' }}>
                    {item.pressaoArterial} <small style={{ color: '#aaa' }}>mmHg</small>
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>Peso Corporal</span>
                  <span style={{ color: '#e67e22', fontWeight: 'bold', fontSize: '1rem' }}>
                    {item.pesoCorporal} <small style={{ color: '#aaa' }}>kg</small>
                  </span>
                </div>

                {/* Sintomas (só aparece se houver) */}
                {item.sintomas && (
                  <div style={{
                    marginTop: '14px', backgroundColor: '#fff5f5', padding: '10px 12px',
                    borderRadius: '8px', borderLeft: '3px solid var(--cardio-red)'
                  }}>
                    <span style={{ color: 'var(--cardio-red)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                      Sintomas
                    </span>
                    <span style={{ color: '#555', fontSize: '0.85rem' }}>{item.sintomas}</span>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
          color="danger"
          cssClass="custom-toast"
        />

      </IonContent>
    </IonPage>
  );
};

export default TelaAcompanhamento;