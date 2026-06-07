package com.example.saudecardiaca.repository;

import com.example.saudecardiaca.model.Acompanhamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcompanhamentoRepository extends JpaRepository<Acompanhamento, Long> {
}
