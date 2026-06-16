package com.example.saudecardiaca.service;

import com.example.saudecardiaca.model.Acompanhamento;
import com.example.saudecardiaca.model.Usuario;
import com.example.saudecardiaca.repository.AcompanhamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.saudecardiaca.exception.RegraNegocioException;

import java.util.List;

@Service
public class AcompanhamentoService {

    @Autowired
    private AcompanhamentoRepository repository;

    public Acompanhamento cadastrar(Acompanhamento acompanhamento, Usuario usuarioLogado) {

        // Frequência Cardíaca: valores médicos aceitos entre 30 e 220 bpm
        if(acompanhamento.getFrequenciaCardiaca() < 30 || acompanhamento.getFrequenciaCardiaca() > 220) {
            throw new RegraNegocioException("Frequência cardíaca inválida. Deve estar entre 30 e 220 bpm.");
        }

        // Oxigenação: valores médicos aceitos entre 70% e 100%
        if(acompanhamento.getNivelOxigenacao() < 70 ||
                acompanhamento.getNivelOxigenacao() > 100) {
            throw new RegraNegocioException("Oxigenação inválida. Deve estar entre 70% e 100%.");
        }

        // Peso corporal: valores razoáveis entre 1 kg e 300 kg
        if(acompanhamento.getPesoCorporal() <= 0 || acompanhamento.getPesoCorporal() > 300) {
            throw new RegraNegocioException("Peso corporal inválido. Deve estar entre 1 e 300 kg.");
        }

        // Pressão Arterial: deve seguir o formato 120/80
        if(!acompanhamento.getPressaoArterial()
                .matches("\\d{2,3}/\\d{2,3}")) {
            throw new RegraNegocioException("Pressão arterial inválida. Use o formato: 120/80");
        }

        // --- VÍNCULO DO USUÁRIO ---
        acompanhamento.setUsuario(usuarioLogado);

        return repository.save(acompanhamento);
    }

    public List<Acompanhamento> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }
}