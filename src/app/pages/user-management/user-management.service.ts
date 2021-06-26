import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }
  public count(where?: any): Observable<number> {
    const whereCondition = {};
    if (where?.username) {
      whereCondition['username'] = where.username;
    }
    if (where?.email) {
      whereCondition['email'] = where.email;
    }
    return this.http.get('/api/management-user/count', {
      params: {
        where: JSON.stringify(whereCondition)
      }
    })
      .pipe(map((m: any) => m.data.count));
  }

  public list(skip: number, limit: number, where?: any) {
    const whereCondition = {};
    if (where?.username) {
      whereCondition['username'] = where.username;
    }
    if (where?.email) {
      whereCondition['email'] = where.email;
    }
    return this.http.get('/api/management-user', {
      params: {
        filter: JSON.stringify({ skip, limit, where: whereCondition })
      }
    }).pipe(map((m: any) => m?.data));
  }

  public patch(data) {
    return this.http.patch(
      `/api/management-user/${data.id}`,
      _.omit({ ...data }, 'roles')
    );
  }

  public post(data) {
    return this.http.post(
      `/api/management-user`,
      _.omit({ ...data }, 'roles')
    );
  }
}
