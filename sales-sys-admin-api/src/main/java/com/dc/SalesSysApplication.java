package com.dc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SalesSysApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext application = SpringApplication.run(SalesSysApplication.class, args);
        Environment env = application.getEnvironment();
        String port = env.getProperty("server.port");
        String path = env.getProperty("server.servlet.context-path");
        System.out.println("   ___    _   _    ___     ___     ___     ___     ___      ___   _   _    _     \n" +
                "  / __|  | | | |  / __|   / __|   | __|   / __|   / __|    | __| | | | |  | |    \n" +
                "  \\__ \\  | |_| | | (__   | (__    | _|    \\__ \\   \\__ \\    | _|  | |_| |  | |__  \n" +
                "  |___/   \\___/   \\___|   \\___|   |___|   |___/   |___/   _|_|_   \\___/   |____| \n" +
                "_|\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"\"|_| \"\"\" |_|\"\"\"\"\"|_|\"\"\"\"\"| \n" +
                "\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-' ");
        System.out.println("Local: http://localhost:" + port + path);
        System.out.println("Swagger-UI: http://localhost:" + port + path + "swagger-ui/index.html");
        System.out.println("Druid-UI: http://localhost:" + port + path + "druid/index.html");

    }

}
