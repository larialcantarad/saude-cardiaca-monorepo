import { useState } from "react";
import {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonToast,
    IonSpinner
} from "@ionic/react";
import TopBar from '../components/TopBar';
import { fetchApi } from '../services/api';

const CadastrarAcompanhamento: React.FC = () => {

    const [form, setForm] = useState({
        frequenciaCardiaca: "",
        oxigenacao: "",
        peso: "",
        pressaoArterial: "",
        sintomas: ""
    });

    const [carregando, setCarregando] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    async function cadastrar(e: React.FormEvent) {
        e.preventDefault();

        // VALIDAÇÃO DE CAMPOS VAZIOS
        if (!form.frequenciaCardiaca || !form.oxigenacao || !form.peso || !form.pressaoArterial) {
            setToastMessage("Por favor, preencha todos os campos antes de enviar.");
            setShowToast(true);
            return;
        }

        // VALIDAÇÃO DE INTERVALOS CLÍNICOS
        const fc = parseInt(form.frequenciaCardiaca, 10);
        const ox = parseInt(form.oxigenacao, 10);
        const peso = parseFloat(form.peso);

        if (fc < 30 || fc > 220) {
            setToastMessage("Frequência cardíaca deve estar entre 30 e 220 bpm.");
            setShowToast(true);
            return;
        }
        if (ox < 70 || ox > 100) {
            setToastMessage("Oxigenação deve estar entre 70% e 100%.");
            setShowToast(true);
            return;
        }
        if (peso <= 0 || peso > 300) {
            setToastMessage("Peso deve estar entre 1 e 300 kg.");
            setShowToast(true);
            return;
        }
        if (!/^\d{2,3}\/\d{2,3}$/.test(form.pressaoArterial)) {
            setToastMessage("Pressão arterial deve seguir o formato: 120/80");
            setShowToast(true);
            return;
        }

        setCarregando(true);

        const dados = {
            frequenciaCardiaca: parseInt(form.frequenciaCardiaca, 10),
            nivelOxigenacao: parseInt(form.oxigenacao, 10), // O Java espera INT
            pesoCorporal: parseFloat(form.peso),          // O Java espera DOUBLE
            pressaoArterial: form.pressaoArterial,
            sintomas: form.sintomas                   // O Java espera uma String normal, não um array
        };

        try {
            // Usamos a nossa fetchApi que já injeta o Token JWT automaticamente!
            await fetchApi("/acompanhamentos", {
                method: "POST",
                body: JSON.stringify(dados)
            });

            setToastMessage("Acompanhamento registrado com sucesso!");
            setShowToast(true);
            setForm({ frequenciaCardiaca: "", oxigenacao: "", peso: "", pressaoArterial: "", sintomas: "" });
        } catch (error: any) {
            setToastMessage(error.message || "Erro ao conectar com o servidor.");
            setShowToast(true);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <IonPage>
            <TopBar titulo="Novo Acompanhamento" mostrarVoltar={true} />
            <IonContent className="custom-background">
                <div className="container-center">
                    <div className="custom-card fade-in-card" style={{ width: '100%', maxWidth: '600px' }}>
                        <h2 className="custom-title" style={{ marginTop: 0, textAlign: 'center' }}>Registrar Sinais Vitais</h2>

                        <form onSubmit={cadastrar} className="custom-form">

                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="number"
                                    placeholder="Frequência Cardíaca (bpm)"
                                    className="custom-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={form.frequenciaCardiaca}
                                    onChange={(e) =>
                                        setForm({ ...form, frequenciaCardiaca: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="number"
                                    placeholder="Oxigenação (%)"
                                    className="custom-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={form.oxigenacao}
                                    onChange={(e) =>
                                        setForm({ ...form, oxigenacao: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="number"
                                    placeholder="Peso (kg)"
                                    className="custom-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={form.peso}
                                    onChange={(e) =>
                                        setForm({ ...form, peso: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="Pressão Arterial (Ex: 120/80)"
                                    className="custom-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={form.pressaoArterial}
                                    onChange={(e) =>
                                        setForm({ ...form, pressaoArterial: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="Sintomas (Ex: Dor no peito, tontura)"
                                    className="custom-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={form.sintomas}
                                    onChange={(e) =>
                                        setForm({ ...form, sintomas: e.target.value })
                                    }
                                />
                            </div>

                            <IonButton
                                expand="block"
                                type="submit"
                                className="custom-button"
                                style={{ marginTop: '20px' }}
                                disabled={carregando}
                            >
                                {carregando ? <IonSpinner name="crescent" /> : 'Salvar Acompanhamento'}
                            </IonButton>

                        </form>
                    </div>
                </div>


                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    position="top"
                    color="dark"
                    cssClass="custom-toast"
                />

            </IonContent>
        </IonPage>
    );
}

export default CadastrarAcompanhamento;
