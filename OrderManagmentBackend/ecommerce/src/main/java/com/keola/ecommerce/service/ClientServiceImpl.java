package com.keola.ecommerce.service;

import com.keola.ecommerce.model.r2dbc.Client;
import com.keola.ecommerce.repository.r2dbc.ClientRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
      this.clientRepository = clientRepository;
    }

    @Override
    public Flux<Client> getAllClients() {
      return clientRepository.findAll();
    }
}
