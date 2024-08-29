import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDERS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order)
  }

  constructor(private http: HttpClient) {}
}
