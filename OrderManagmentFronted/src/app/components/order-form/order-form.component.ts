import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { Client } from '../../models/client';
import { Product } from '../../models/product';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    FormsModule,
    NgForOf
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isEditMode = false;
  orderId?: string;
  errorMessage: string = '';
  clients: Client[] = [];
  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      client: ['', Validators.required],
      product: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadProducts();
    this.initializeOrder();
  }

  private initializeOrder(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.isEditMode = true;
        this.orderId = id;
        this.loadOrder(id);
      }
    });
  }

  private loadOrder(id: string): void {
    this.orderService.getOrder(id).pipe(
      tap((order: Order) => {
        const selectedClient = this.clients.find(client => Number(client.id) === order.clientId);
        this.orderForm.patchValue({
          client: selectedClient || null,
          product: this.selectedProducts.filter(product => order.productIds.includes(Number(product.id)))
        });
        this.selectedProducts = this.products.filter(product => order.productIds.includes(Number(product.id)));
      }),
      catchError(() => {
        this.errorMessage = 'Error al cargar pedido';
        return [];
      })
    ).subscribe();
  }

  private loadClients(): void {
    this.orderService.getClients().pipe(
      tap((data) => this.clients = data),
      catchError((error) => {
        this.errorMessage = error;
        return [];
      })
    ).subscribe();
  }

  private loadProducts(): void {
    this.orderService.getProducts().pipe(
      tap((data) => this.products = data),
      catchError((error) => {
        this.errorMessage = error;
        return [];
      })
    ).subscribe();
  }

  onSelectItem(): void {
    const selectedItem = this.orderForm.get('product')?.value;
    if (selectedItem && !this.selectedProducts.includes(selectedItem)) {
      this.selectedProducts.push(selectedItem);
    }
  }

  removeItem(item: Product): void {
    const index = this.selectedProducts.indexOf(item);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }

  onSubmit(): void {
    const selectedClient = this.orderForm.get('client')?.value;
    if (!selectedClient) {
      this.errorMessage = 'Cliente no válido';
      return;
    }

    const order: Order = {
      clientId: selectedClient.id,
      productIds: this.selectedProducts.map(product => Number(product.id)),
      clientName: selectedClient.name
    };

    const orderRequest$ = this.isEditMode && this.orderId
      ? this.orderService.updateOrder(this.orderId, order)
      : this.orderService.createOrder(order);

    orderRequest$.pipe(
      tap(() => this.router.navigate(['/orders'])),
      catchError(() => {
        this.errorMessage = this.isEditMode ? 'Error al actualizar pedido' : 'Error al crear pedido';
        return [];
      })
    ).subscribe();
  }

  back(): void {
    this.router.navigate(['/orders']);
  }
}
