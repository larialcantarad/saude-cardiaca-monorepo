package com.example.saudecardiaca.repository;

import com.example.saudecardiaca.model.Acompanhamento;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AcompanhamentoRepository {

    private List<Acompanhamento> lista = new ArrayList<>();

    public void salvar(Acompanhamento acompanhamento) {
        lista.add(acompanhamento);
    }

    public List<Acompanhamento> listarTodos() {
        return lista;
    }
}