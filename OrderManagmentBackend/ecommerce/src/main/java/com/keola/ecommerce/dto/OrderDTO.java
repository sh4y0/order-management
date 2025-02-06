package com.keola.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    @NotNull(message = "El clientId es obligatorio")
    private Long clientId;

    private String clientName;

    @NotEmpty(message = "Debe tener al menos un producto")
    private List<Long> productIds;

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
}
