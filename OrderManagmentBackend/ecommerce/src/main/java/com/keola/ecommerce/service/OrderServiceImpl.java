package com.keola.ecommerce.service;

import com.keola.ecommerce.dto.OrderDTO;
import com.keola.ecommerce.exception.ResourceNotFoundException;
import com.keola.ecommerce.model.mongo.Order;
import com.keola.ecommerce.model.r2dbc.Product;
import com.keola.ecommerce.repository.mongo.OrderRepository;
import com.keola.ecommerce.repository.r2dbc.ClientRepository;
import com.keola.ecommerce.repository.r2dbc.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

@Service
public class OrderServiceImpl implements OrderService{
  private final OrderRepository orderRepository;
  private final ClientRepository clientRepository;
  private final ProductRepository productRepository;

  public OrderServiceImpl(OrderRepository orderRepository, ClientRepository clientRepository, ProductRepository productRepository) {
    this.orderRepository = orderRepository;
    this.clientRepository = clientRepository;
    this.productRepository = productRepository;
  }

  @Override
  public Mono<Order> createOrder(OrderDTO orderDTO) {
    Mono<Void> validateClient = clientRepository.findById(orderDTO.getClientId())
      .switchIfEmpty(Mono.error(new ResourceNotFoundException("Cliente no encontrado")))
      .then();

    Flux<Product> productsFlux = Flux.fromIterable(orderDTO.getProductIds())
      .flatMap(productId -> productRepository.findById(productId))
      .switchIfEmpty(Mono.error(new ResourceNotFoundException("Alguno de los productos no fueron encontrados")));

    Mono<BigDecimal> totalMono = productsFlux
      .map(Product::getPrice)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    return validateClient
      .then(totalMono)
      .flatMap(total -> {
        Order order = new Order();
        order.setClientId(orderDTO.getClientId());
        order.setClientName(orderDTO.getClientName());
        order.setProductIds(orderDTO.getProductIds());
        order.setTotal(total);
        return orderRepository.save(order);
      });
  }

  @Override
  public Mono<Order> getOrder(String id) {
    return orderRepository.findById(id)
      .switchIfEmpty(Mono.error(new ResourceNotFoundException("Pedido no encontrado")));
  }

  @Override
  public Flux<Order> getAllOrders() {
    return orderRepository.findAll();
  }

  @Override
  public Mono<Order> updateOrder(String id, OrderDTO orderDTO) {
    return getOrder(id)
      .flatMap(existingOrder -> {
        Mono<Void> validateClient = clientRepository.findById(orderDTO.getClientId())
          .switchIfEmpty(Mono.error(new ResourceNotFoundException("Cliente no encontrado")))
          .then();

        Flux<Product> productsFlux = Flux.fromIterable(orderDTO.getProductIds())
          .flatMap(productRepository::findById)
          .switchIfEmpty(Mono.error(new ResourceNotFoundException("Alguno de los productos no fue encontrado")));

        Mono<BigDecimal> totalMono = productsFlux
          .map(Product::getPrice)
          .reduce(BigDecimal.ZERO, BigDecimal::add);

        return validateClient.then(totalMono)
          .flatMap(total -> {
            existingOrder.setClientId(orderDTO.getClientId());
            existingOrder.setProductIds(orderDTO.getProductIds());
            existingOrder.setClientName(orderDTO.getClientName());
            existingOrder.setTotal(total);
            return orderRepository.save(existingOrder);
          });
      });
  }

  @Override
  public Mono<Void> deleteOrder(String id) {
    return getOrder(id)
      .flatMap(order -> orderRepository.delete(order))
      .then();
  }
}
