package com.keola.ecommerce.controller;

import com.keola.ecommerce.dto.OrderDTO;
import com.keola.ecommerce.model.mongo.Order;
import com.keola.ecommerce.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/orders")
@Validated
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
      this.orderService = orderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Order> createOrder(@Valid @RequestBody OrderDTO orderDTO) {
      return orderService.createOrder(orderDTO);
    }

    @GetMapping("/{id}")
    public Mono<Order> getOrder(@PathVariable String id) {
      return orderService.getOrder(id);
    }

    @GetMapping
    public Flux<Order> getAllOrders() {
      return orderService.getAllOrders();
    }

    @PutMapping("/{id}")
    public Mono<Order> updateOrder(@PathVariable String id, @Valid @RequestBody OrderDTO orderDTO) {
      return orderService.updateOrder(id, orderDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteOrder(@PathVariable String id) {
      return orderService.deleteOrder(id);
    }
}
