import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/react';

import './TelaAcompanhamento.css';

const TelaAcompanhamento = () => {

  const acompanhamento = {
    frequenciaCardiaca: 75,
    nivelOxigenacao: 98,
    pesoCorporal: 70,
    pressaoArterial: '120/80',
    sintomas: 'Nenhum sintoma relatado'
  };

  const editarAcompanhamento = () => {
    alert('fazer o link vei.');
  };

   //** */

  return (
    <IonPage>
      <IonContent className="pagina">

        <IonCard className="card-acompanhamento">
          <IonCardContent>

            <h1>Acompanhamento Cardíaco</h1>

            <div className="campo">
              <span className="titulo">Frequência Cardíaca</span>
              <span>{acompanhamento.frequenciaCardiaca} bpm</span>
            </div>

            <div className="campo">
              <span className="titulo">Oxigenação</span>
              <span>{acompanhamento.nivelOxigenacao}%</span>
            </div>

            <div className="campo">
              <span className="titulo">Peso</span>
              <span>{acompanhamento.pesoCorporal} kg</span>
            </div>

            <div className="campo">
              <span className="titulo">Pressão Arterial</span>
              <span>{acompanhamento.pressaoArterial}</span>
            </div>

            <div className="campo">
              <span className="titulo">Sintomas</span>
              <span>{acompanhamento.sintomas}</span>
            </div>

            <IonButton
              expand="block"
              className="botao-editar"
              onClick={editarAcompanhamento}
            >
              EDITAR
            </IonButton>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default TelaAcompanhamento;