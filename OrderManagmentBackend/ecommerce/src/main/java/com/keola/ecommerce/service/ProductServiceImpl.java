package com.keola.ecommerce.service;

import com.keola.ecommerce.model.r2dbc.Product;
import com.keola.ecommerce.repository.r2dbc.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;

  public ProductServiceImpl(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public Flux<Product> getAllProducts() {
    return productRepository.findAll();
  }
}
