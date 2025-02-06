package com.keola.ecommerce.model.r2dbc;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Table("producto")
public class Product {
    @Id
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getName() {
        return nombre;
      }

      public void setName(String nombre) {
        this.nombre = nombre;
      }

      public String getDescripcion() {
        return descripcion;
      }

      public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
      }

    public BigDecimal getPrice() {
        return precio;
      }

      public void setPrice(BigDecimal precio) {
        this.precio = precio;
      }
}
