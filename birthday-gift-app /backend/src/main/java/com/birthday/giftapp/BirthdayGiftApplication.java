package com.birthday.giftapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point
 * Birthday Gift Application - Interactive web-based birthday celebration
 */
@SpringBootApplication
public class BirthdayGiftApplication {

    public static void main(String[] args) {
        SpringApplication.run(BirthdayGiftApplication.class, args);
        System.out.println("\n🎂 Birthday Gift Application Started Successfully! 🎉");
        System.out.println("📍 Access the API at: http://localhost:8080");
        System.out.println("📍 H2 Console at: http://localhost:8080/h2-console\n");
    }
}
