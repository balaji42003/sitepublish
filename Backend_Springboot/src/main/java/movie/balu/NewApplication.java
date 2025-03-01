package movie.balu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NewApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(NewApplication.class, args);
	}

}
