package com.example.saudecardiaca.service;

import com.example.saudecardiaca.model.Acompanhamento;
import com.example.saudecardiaca.repository.AcompanhamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.saudecardiaca.exception.RegraNegocioException;

import java.util.List;

@Service
public class AcompanhamentoService {

    @Autowired
    private AcompanhamentoRepository repository;

    public Acompanhamento cadastrar(Acompanhamento acompanhamento) {

        if(acompanhamento.getFrequenciaCardiaca() < 0) {
            throw new RegraNegocioException("Frequência cardíaca inválida");
        }

        if(acompanhamento.getOxigenacao() < 95 ||
                acompanhamento.getOxigenacao() > 100) {
            throw new RegraNegocioException("Oxigenação inválida");
        }

        if(!acompanhamento.getPressaoArterial()
                .matches("\\d{2,3}/\\d{2,3}")) {
            throw new RegraNegocioException("Pressão arterial inválida");
        }

        return repository.save(acompanhamento);
    }

    public List<Acompanhamento> listar() {
        return repository.findAll();
    }

}