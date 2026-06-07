package com.example.saudecardiaca.controller;

import com.example.saudecardiaca.model.Acompanhamento;
import com.example.saudecardiaca.service.AcompanhamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acompanhamentos")
public class AcompanhamentoController {

    @Autowired
    private AcompanhamentoService service;

    @PostMapping
    public ResponseEntity<Acompanhamento> cadastrar(
            @RequestBody Acompanhamento acompanhamento) {

        Acompanhamento novoAcompanhamento =
                service.cadastrar(acompanhamento);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(novoAcompanhamento);
    }

    @GetMapping
    public ResponseEntity<List<Acompanhamento>> listar() {
        return ResponseEntity.ok(service.listar());
    }
}
