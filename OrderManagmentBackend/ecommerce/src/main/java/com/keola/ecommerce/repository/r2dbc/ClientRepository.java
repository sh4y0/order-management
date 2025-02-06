package com.keola.ecommerce.repository.r2dbc;

import com.keola.ecommerce.model.r2dbc.Client;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ClientRepository extends ReactiveCrudRepository<Client, Long> {

}
