package com.example.saudecardiaca.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String sobrenome;

    @Column(unique = true)
    private String email;

    private String numeroTelefone;
    private String senha;
    private LocalDate dataNascimento;
    private String sexo;
    private String paisResidencia;
}