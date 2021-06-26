import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private http: HttpClient) { }

  getReleases(limit: number, skip: number, filter: any): Observable<any[]> {
    return this.http.get('/api/orders', {
      params: {
        filter: JSON.stringify({
          limit: limit,
          skip: skip,
          order: "createDate desc",
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

  getReleaseLength(filter: any): Observable<any> {

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

  deleteRelease(orderId: string): Observable<any[]> {
    return this.http.delete(`/api/orders/${orderId}`)
      .pipe(map(
        (m: any) => {
          return m.data;
        }
      ),catchError((e) => {
        throw new Error("interal error");
        
      }));
  }

  getUserList(filter: any): Observable<any> {

    return this.http.get('/api/management-user', {
      params: {
        "where": JSON.stringify(filter)
      }
    })
      .pipe(map(
        (m: any) => {
          return m.data;
        }
      ));
  }

  createRelease(postData: any): Observable<any> {
    return this.http.post('/api/orders', postData)
      .pipe(map(
        (m: any) => {
          return m;
        }
      ),
      catchError((e) => {
        throw new Error("interal error");
        
      })
      );
  }
}
