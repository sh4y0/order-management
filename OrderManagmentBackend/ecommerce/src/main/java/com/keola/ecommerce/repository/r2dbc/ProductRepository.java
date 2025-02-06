package com.keola.ecommerce.repository.r2dbc;

import com.keola.ecommerce.model.r2dbc.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProductRepository extends ReactiveCrudRepository<Product, Long> {

}
