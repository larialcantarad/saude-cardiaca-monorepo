package com.example.saudecardiaca.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegistroRequestDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String numeroTelefone;
    private String senha;
    private String confirmarSenha;
    private LocalDate dataNascimento;
    private String sexo;
    private String paisResidencia;
}