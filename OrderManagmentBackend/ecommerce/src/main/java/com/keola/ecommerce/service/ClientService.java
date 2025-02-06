package com.keola.ecommerce.service;

import com.keola.ecommerce.model.r2dbc.Client;
import reactor.core.publisher.Flux;

public interface ClientService {
  Flux<Client> getAllClients();
}
