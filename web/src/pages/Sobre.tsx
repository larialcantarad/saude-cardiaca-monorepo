import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React from 'react';
import './Sobre.css'; 
import TopBar from '../components/TopBar';

const Sobre: React.FC = () => {
  return (
    <IonPage>
      <TopBar titulo="Informações" />
      <IonContent className="custom-background">
        <div className="container-center">
          <div className="custom-card fade-in-card">
            <h1 className="custom-title">Equipe do Projeto</h1>
            
            <div className="integrantes-list">
              <div className="integrante-item animate-1">
                <span className="integrante-nome">Julia Ferreira Barcelos Tagliari</span>
              </div>
              <div className="integrante-item animate-2">
                <span className="integrante-nome">Larissa Alcantara</span>
              </div>
              <div className="integrante-item animate-3">
                <span className="integrante-nome">Luiza Helena Filipe Lustosa da Costa</span>
              </div>
              <div className="integrante-item animate-4">
                <span className="integrante-nome">Victor Hugo Candido Malvão</span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sobre;
