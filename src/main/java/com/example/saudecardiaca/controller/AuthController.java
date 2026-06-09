package com.example.saudecardiaca.controller;

import com.example.saudecardiaca.dto.LoginRequestDTO;
import com.example.saudecardiaca.dto.RegistroRequestDTO;
import com.example.saudecardiaca.model.Usuario;
import com.example.saudecardiaca.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService service;

    // Endpoint 1: Criar Conta
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody RegistroRequestDTO dto) {
        Usuario novoUsuario = service.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    // Endpoint 2: Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {
        Usuario usuarioLogado = service.login(dto);

        // Como é simplificado, podemos apenas retornar uma mensagem de sucesso
        // ou o ID do usuário para o front-end saber quem logou.
        return ResponseEntity.ok("Login realizado com sucesso! Bem-vindo(a), " + usuarioLogado.getNome());
    }
}