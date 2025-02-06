package com.keola.ecommerce.repository.mongo;

import com.keola.ecommerce.model.mongo.Order;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface OrderRepository extends ReactiveMongoRepository<Order, String> {

}
