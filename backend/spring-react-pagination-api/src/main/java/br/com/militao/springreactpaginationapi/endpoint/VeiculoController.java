package br.com.militao.springreactpaginationapi.endpoint;

import br.com.militao.springreactpaginationapi.persistence.entity.Veiculo;
import br.com.militao.springreactpaginationapi.persistence.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    public Page<Veiculo> list(
            @RequestParam(
                    value = "page",
                    required = false,
                    defaultValue = "0") int page,
            @RequestParam(
                    value = "size",
                    required = false,
                    defaultValue = "10") int size) {
        return veiculoRepository.findAll(PageRequest.of(page, size));
    }
}
