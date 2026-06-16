import TopBar from "./components/TopBar/TopBar.js";
import CadastroAcompanhamento from "./pages/CadastroAcompanhamento/CadastroAcompanhamento";

function App() {
  return (
      <>
        <TopBar titulo="Acompanhamento de Saúde Cardíaca" />
        <CadastroAcompanhamento />
      </>
  );
}

export default App;