import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Order } from '../models/order'
import {Client} from '../models/client';
import {Product} from '../models/product';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getClients(): Observable<Client[]> {
    if (this.clientsSubject.value.length === 0) {
      console.log("GET CLIENTS")
      this.http.get<Client[]>('http://localhost:8080/api/clients').pipe(
        tap(clients => this.clientsSubject.next(clients))
      ).subscribe();
    }
    return this.clientsSubject.asObservable();
    //return this.http.get<Client[]>('http://localhost:8080/api/clients');
  }

  getProducts(): Observable<Product[]> {
    if (this.productsSubject.value.length === 0) {
      console.log("GET PRODUCTS")
      this.http.get<Product[]>('http://localhost:8080/api/products').pipe(
        tap(products => this.productsSubject.next(products))
      ).subscribe();
    }
    return this.productsSubject.asObservable();
    //return this.http.get<Product[]>('http://localhost:8080/api/products');
  }

}
