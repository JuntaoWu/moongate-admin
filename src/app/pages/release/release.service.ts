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
    return this.http.get('/orders', {
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

    return this.http.get('/orders/count', {
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

  deleteRelease(orderId: string): Observable<any> {
    return this.http.delete(`/orders/${orderId}`)
      .pipe(map(
        (m: any) => {
          return m;
        }
      ),catchError((e) => {
        throw new Error("interal error");
        
      }));
  }

  getUserList(filter: any): Observable<any> {

    return this.http.get('/management-user', {
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
    return this.http.post('/orders', postData)
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

  search(field: string, searchTerm: string) {
    let whereCondition = {"orderType":"RELEASE","status":"ACTIVE"};
    whereCondition[field] = {
      like: `${searchTerm}.*`,
      options: 'i'
    };

    return this.http.get('/orders', {
      params: {
        filter: JSON.stringify({ skip: 0, limit: 10, where: whereCondition })
      }
    }).pipe(map((m: any) => {
      return m?.data?.map(item => item[field]);
    }));
  }

}
