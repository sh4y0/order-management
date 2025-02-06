package com.keola.ecommerce.model.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private Long clientId;
    private String clientName;
    private List<Long> productIds;
    private BigDecimal total;

    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }

    public Long getClientId() {
        return clientId;
      }

      public void setClientId(Long clientId) {
        this.clientId = clientId;
      }

      public String getClientName() {
        return clientName;
      }

      public void setClientName(String clientName) {
        this.clientName = clientName;
      }

      public List<Long> getProductIds() {
            return productIds;
          }

      public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
      }

      public BigDecimal getTotal() {
        return total;
      }

      public void setTotal(BigDecimal total) {
        this.total = total;
      }
}
