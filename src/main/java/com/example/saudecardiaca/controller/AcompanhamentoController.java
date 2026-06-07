package com.example.saudecardiaca.controller;

import com.example.saudecardiaca.model.Acompanhamento;
import com.example.saudecardiaca.service.AcompanhamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acompanhamentos")
public class AcompanhamentoController {

    @Autowired
    private AcompanhamentoService service;

    @PostMapping
    public String cadastrar(@RequestBody Acompanhamento acompanhamento) {

        service.cadastrar(acompanhamento);

        return "Registro criado com sucesso!";
    }

    @GetMapping
    public List<Acompanhamento> listar() {
        return service.listar();
    }
}
