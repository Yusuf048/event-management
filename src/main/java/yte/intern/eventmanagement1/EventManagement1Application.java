package yte.intern.eventmanagement1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

//@EntityScan("<yte.intern.eventmanagement1>")
@SpringBootApplication
public class EventManagement1Application {

	public static void main(String[] args) {
		SpringApplication.run(EventManagement1Application.class, args);
	}

}
