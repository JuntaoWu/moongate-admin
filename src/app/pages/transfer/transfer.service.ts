import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getTransfers(limit: number, skip: number, filter: any): Observable<any[]> {
    return this.http.get('/transfer/admin', {
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

  getTransferLength(filter: any): Observable<any> {

    return this.http.get('/transfer/count/admin', {
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


  deleteTransfer(orderId: string): Observable<any> {
    return this.http.delete(`/transfer/${orderId}`)
      .pipe(map(
        (m: any) => {
          return m;
        }
      ), catchError((e) => {
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

  createTransfer(postData: any): Observable<any> {
    return this.http.post('/transfer/admin', postData)
      .pipe(map(
        (m: any) => {
          return m;
        }
      ),
        catchError((e) => {
          throw new Error(e);

        })
      );
  }
}
