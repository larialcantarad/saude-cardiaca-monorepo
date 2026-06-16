import { useState } from "react";
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton
} from "@ionic/react";

import "./CadastroAcompanhamento.css";

function CadastrarAcompanhamento() {

    const [form, setForm] = useState({
        frequenciaCardiaca: "",
        oxigenacao: "",
        peso: "",
        pressaoArterial: "",
        sintomas: ""
    });

    function alterarCampo(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function cadastrar(e){
        e.preventDefault();

        const dados = {
            frequenciaCardiaca: Number(form.frequenciaCardiaca),
            oxigenacao: Number(form.oxigenacao),
            peso: Number(form.peso),
            pressaoArterial: form.pressaoArterial,
            sintomas: form.sintomas.split(",")
        };

        try{
            const resposta = await fetch(
                "http://localhost:8081/acompanhamentos",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(dados)
                }
            );

            if(resposta.ok){
                alert("Cadastro realizado com sucesso!");
            }else{
                const erro = await resposta.text();
                alert(erro);
            }

        }catch{
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">

                <IonCard>
                    <IonCardContent>

                        <h1>Acompanhamento Cardíaco</h1>

                        <form onSubmit={cadastrar}>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="Frequência Cardíaca"
                                    labelPlacement="stacked"
                                    name="frequenciaCardiaca"
                                    placeholder="Ex: 72"
                                    onIonInput={(e) =>
                                        setForm({
                                            ...form,
                                            frequenciaCardiaca: e.detail.value || ""
                                        })
                                    }
                                />
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="Oxigenação (%)"
                                    labelPlacement="stacked"
                                    name="oxigenacao"
                                    placeholder="Ex: 98"
                                    onIonInput={(e) =>
                                        setForm({
                                            ...form,
                                            oxigenacao: e.detail.value || ""
                                        })
                                    }
                                />
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="Peso (kg)"
                                    labelPlacement="stacked"
                                    name="peso"
                                    placeholder="Ex: 68"
                                    onIonInput={(e) =>
                                        setForm({
                                            ...form,
                                            peso: e.detail.value || ""
                                        })
                                    }
                                />
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    label="Pressão Arterial"
                                    labelPlacement="stacked"
                                    placeholder="120/80"
                                    onIonInput={(e) =>
                                        setForm({
                                            ...form,
                                            pressaoArterial: e.detail.value || ""
                                        })
                                    }
                                />
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    label="Sintomas"
                                    labelPlacement="stacked"
                                    placeholder="Dor no peito, tontura..."
                                    onIonInput={(e) =>
                                        setForm({
                                            ...form,
                                            sintomas: e.detail.value || ""
                                        })
                                    }
                                />
                            </IonItem>

                            <IonButton
                                expand="block"
                                type="submit"
                                className="btn-cadastrar"
                            >
                                Cadastrar
                            </IonButton>

                        </form>

                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
}

export default CadastrarAcompanhamento;