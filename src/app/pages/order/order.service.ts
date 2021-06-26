import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(limit: number, skip: number, filter: any): Observable<any[]> {
    return this.http.get('/api/orders', {
      params: {
        filter: JSON.stringify({
          limit: limit,
          skip: skip,
          where: filter
        })
      }
    })
      .pipe(map(
        (m: any) => {
          return m.data;
        }
      ));
  }

  getOrderLength(filter: any): Observable<any> {

    return this.http.get('/api/orders/count', {
      params: {
        "where": JSON.stringify(filter)
      }
    })
      .pipe(map(
        (m: any) => {
          return m.data.count;
        }
      ));
  }

  deleteOrder(orderId: string): Observable<any[]> {
    return this.http.delete(`/api/orders/${orderId}`)
      .pipe(map(
        (m: any) => {
          return m.data;
        }
      ));
  }
}
