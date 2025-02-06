import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Client} from '../../models/client';
import {Product} from '../../models/product';

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
export class OrderFormComponent implements OnInit{
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
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.orderId = params['id'];
        if (this.orderId) {
          this.loadOrder(this.orderId);

        }
      }
    });
  }

  loadOrder(id: string): void {
    this.orderService.getOrder(id).subscribe({
      next: (order: Order) => {
        const selectedClient = this.clients.find(client => Number(client.id) === order.clientId);
        this.orderForm.patchValue({
          product: this.selectedProducts.map((product: Product) => product.name),
          client: selectedClient || null,
        });

        this.selectedProducts = this.products.filter(product => order.productIds.includes(Number(product.id)));
      },
      error: (err) => this.errorMessage = 'Error al cargar pedido'
    });
  }


  loadClients(): void {
    this.orderService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: error => this.errorMessage = error,
    })
  }

  loadProducts(): void {
    this.orderService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: error => this.errorMessage = error,
    })
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
    const order: Order = {
      clientId: selectedClient.id,
      productIds: this.selectedProducts.map((product) => Number(product.id)),
      clientName: selectedClient.name
    };
    console.log("IS EDIT MODE: ", this.isEditMode)
    console.log("SIZE PRODUCTS: ", this.selectedProducts.length)
    if (this.isEditMode && this.orderId) {
      console.log("SIZE PRODUCTS: ", this.selectedProducts.length)
      this.orderService.updateOrder(this.orderId, order).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: () => this.errorMessage = 'Error al actualizar pedido'
      });
    } else {
      this.orderService.createOrder(order).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: () => this.errorMessage = 'Error al crear pedido'
      });
    }
  }

  back(){
    this.router.navigate(['/orders']).then(r => "")
  }
}

