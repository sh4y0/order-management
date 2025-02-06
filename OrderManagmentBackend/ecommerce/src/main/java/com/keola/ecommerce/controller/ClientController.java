package com.keola.ecommerce.controller;

import com.keola.ecommerce.model.r2dbc.Client;
import com.keola.ecommerce.service.ClientService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
      this.clientService = clientService;
    }

    @GetMapping
    public Flux<Client> getClients() {
      return clientService.getAllClients();
    }

}
