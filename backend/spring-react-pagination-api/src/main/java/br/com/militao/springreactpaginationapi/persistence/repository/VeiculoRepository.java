package br.com.militao.springreactpaginationapi.persistence.repository;

import br.com.militao.springreactpaginationapi.persistence.entity.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
}
