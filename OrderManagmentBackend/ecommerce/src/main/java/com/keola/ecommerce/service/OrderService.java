package com.keola.ecommerce.service;

import com.keola.ecommerce.dto.OrderDTO;
import com.keola.ecommerce.model.mongo.Order;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface OrderService {
    Mono<Order> createOrder(OrderDTO orderDTO);
    Mono<Order> getOrder(String id);
    Flux<Order> getAllOrders();
    Mono<Order> updateOrder(String id, OrderDTO orderDTO);
    Mono<Void> deleteOrder(String id);
}
