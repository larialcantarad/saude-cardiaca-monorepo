package com.example.saudecardiaca.service;

import com.example.saudecardiaca.dto.LoginRequestDTO;
import com.example.saudecardiaca.dto.RegistroRequestDTO;
import com.example.saudecardiaca.exception.RegraNegocioException;
import com.example.saudecardiaca.model.Usuario;
import com.example.saudecardiaca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario registrar(RegistroRequestDTO dto) {
        // 1. Validar se o e-mail já existe
        if (repository.existsByEmail(dto.getEmail())) {
            throw new RegraNegocioException("Este e-mail já está em uso.");
        }

        // 2. Validar confirmação de senha
        if (!dto.getSenha().equals(dto.getConfirmarSenha())) {
            throw new RegraNegocioException("As senhas não coincidem.");
        }

        // 3. Montar e salvar o usuário
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setSobrenome(dto.getSobrenome());
        usuario.setEmail(dto.getEmail());
        usuario.setNumeroTelefone(dto.getNumeroTelefone());
        usuario.setSenha(dto.getSenha()); // Em um ambiente de prod, aqui usaríamos BCrypt
        usuario.setDataNascimento(dto.getDataNascimento());
        usuario.setSexo(dto.getSexo());
        usuario.setPaisResidencia(dto.getPaisResidencia());

        return repository.save(usuario);
    }

    public Usuario login(LoginRequestDTO dto) {
        // Buscar por e-mail e conferir a senha (simples)
        Optional<Usuario> usuarioOpt = repository.findByEmail(dto.getEmail());

        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getSenha().equals(dto.getSenha())) {
            throw new RegraNegocioException("E-mail ou senha incorretos.");
        }

        return usuarioOpt.get();
    }
}