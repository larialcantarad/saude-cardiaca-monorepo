import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet,
  IonTabBar, IonTabButton, IonTabs, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { pulseOutline, informationCircleOutline, heartOutline } from 'ionicons/icons';

// Importação das Páginas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Sobre from './pages/Sobre';
import CadastrarAcompanhamento from "./pages/CadastroAcompanhamento";
import TelaAcompanhamento from "./pages/TelaAcompanhamento";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* import '@ionic/react/css/palettes/dark.system.css';  <-- REMOVIDO PARA FORÇAR TEMA CLARO */
import './theme/variables.css';
import './theme/sus-theme.css'; // Estética SUS/Cardiologia adicionada!

setupIonicReact();

const App: React.FC = () => {
  // Inicializa olhando se já existe um token salvo
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('token') !== null;
  });

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          /* ROTAS NÃO AUTENTICADAS */
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login onLogin={() => setIsAuthenticated(true)} />
            </Route>
            <Route exact path="/cadastro">
              <Cadastro onLogin={() => setIsAuthenticated(true)} />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/dashboard">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        ) : (
          /* ROTAS AUTENTICADAS (Com Navbar/Tabs) */
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/dashboard">
                <Dashboard onLogout={() => setIsAuthenticated(false)} />
              </Route>
              <Route exact path="/acompanhamentos">
                <TelaAcompanhamento />
              </Route>
              <Route exact path="/acompanhamento/novo">
                <CadastrarAcompanhamento />
              </Route>
              <Route exact path="/sobre">
                <Sobre />
              </Route>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/login">
                <Redirect to="/dashboard" />
              </Route>
            </IonRouterOutlet>

            {/* NAVBAR INFERIOR (Estética SUS / Cardíaca) */}
            <IonTabBar slot="bottom" className="sus-tab-bar">
              <IonTabButton tab="dashboard" href="/dashboard" className="sus-tab-button">
                <IonIcon icon={pulseOutline} />
                <IonLabel>Resumo</IonLabel>
              </IonTabButton>
              <IonTabButton tab="acompanhamentos" href="/acompanhamentos" className="sus-tab-button">
                <IonIcon icon={heartOutline} />
                <IonLabel>Registros</IonLabel>
              </IonTabButton>
              <IonTabButton tab="sobre" href="/sobre" className="sus-tab-button">
                <IonIcon icon={informationCircleOutline} />
                <IonLabel>Sobre</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
