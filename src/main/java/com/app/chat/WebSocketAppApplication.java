package com.app.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebSocketAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebSocketAppApplication.class, args);
		System.out.println("Running");
	}

}
