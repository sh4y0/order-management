import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import { Order } from '../../models/order'
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [
    NgForOf
  ]
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: error => this.errorMessage = error,
    })
  }

  createOrder() {
    this.router.navigate(['/orders/new']).then(r => "");
  }
  checkOrder(id: string) {
    this.router.navigate(['/orders/detail', `${id}`]).then(r => "");
  }

  editOrder(id: string) {
    this.router.navigate(['/orders/edit', `${id}`]).then(r => "");
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
      error: () => this.errorMessage = "Error al eliminar el pedido",
    })
  }
}
