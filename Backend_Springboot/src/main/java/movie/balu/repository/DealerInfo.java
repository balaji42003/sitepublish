package movie.balu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import movie.balu.model.DealerLogin;

public interface DealerInfo extends JpaRepository<DealerLogin, Integer> {
    DealerLogin findByUsername(String username);
}
