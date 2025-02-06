package com.keola.ecommerce.model.r2dbc;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Table("cliente")
public class Client {
    @Id
    private Long id;
    private String nombre;
    private String email;

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

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }
}
