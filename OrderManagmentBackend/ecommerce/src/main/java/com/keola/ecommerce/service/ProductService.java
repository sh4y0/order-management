package com.keola.ecommerce.service;

import com.keola.ecommerce.model.r2dbc.Product;
import reactor.core.publisher.Flux;

public interface ProductService {
  Flux<Product> getAllProducts();
}
