package com.example.saudecardiaca.service;

import com.example.saudecardiaca.model.Acompanhamento;
import com.example.saudecardiaca.repository.AcompanhamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcompanhamentoService {

    @Autowired
    private AcompanhamentoRepository repository;

    public void cadastrar(Acompanhamento acompanhamento) {

        if(acompanhamento.getOxigenacao() < 95 || acompanhamento.getOxigenacao() > 100) {
            throw new RuntimeException("Oxigenação inválida");
        }

        repository.salvar(acompanhamento);
    }

    public List<Acompanhamento> listar() {
        return repository.listarTodos();
    }
}