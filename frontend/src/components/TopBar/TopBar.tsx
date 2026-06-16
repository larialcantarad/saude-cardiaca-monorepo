import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import "./TopBar.css";

const TopBar: React.FC<{ titulo: string; mostrarVoltar?: boolean }> = ({ titulo, mostrarVoltar }) => {
    return (
        <IonHeader>
            <IonToolbar className="sus-header">
                {mostrarVoltar && (
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" text="Voltar" color="light" />
                    </IonButtons>
                )}
                <IonTitle style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Ícone de Batimento Cardíaco (Cardiologia) misturado com estilo SUS */}
                    <svg className="logo-cardiologia" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        <path fill="#ffffff" d="M11.5 13H9v-2h2.5V8.5h2V11H16v2h-2.5v2.5h-2V13z" /> {/* Cruzinha da saúde dentro do coração */}
                    </svg>
                    <span style={{ fontWeight: 'bold' }}>{titulo}</span>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default TopBar;