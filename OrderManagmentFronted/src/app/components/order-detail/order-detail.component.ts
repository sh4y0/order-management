import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import { Order } from '../../models/order'
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  imports: [
    NgForOf
  ]
})

export class OrderDetailComponent implements OnInit {
  errorMessage: string = '';
  orderId?: string;
  products: Product[] = [];
  clientName?: string;
  totalPrice: number | undefined = 0;
  totalProducts: number = 0;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderId = params['id'];
        if (this.orderId) {
          this.loadProducts();
          this.loadOrder(this.orderId);
        }

      }
    });

  }

  loadOrder(id: string): void {
    this.orderService.getOrder(id).subscribe({
      next: (order: Order) => {
        this.products = this.products.filter(product => order.productIds.includes(Number(product.id)));
        this.clientName = order.clientName;
        this.totalPrice = order.total;
        this.totalProducts = order.productIds.length
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

  back(){
    this.router.navigate(['/orders']).then(() => "")
  }

}
