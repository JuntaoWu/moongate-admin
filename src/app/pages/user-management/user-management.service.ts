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
    return this.http.get('/management-user/count', {
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
    return this.http.get('/management-user', {
      params: {
        filter: JSON.stringify({ skip, limit, where: whereCondition })
      }
    }).pipe(map((m: any) => m?.data));
  }

  public patch(data) {
    return this.http.patch(
      `/management-user/${data.id}`,
      _.omit({ ...data }, 'roles')
    );
  }

  public post(data) {
    return this.http.post(
      `/management-user`,
      _.omit({ ...data }, 'roles')
    );
  }

  public search(field: string, searchTerm: string) {
    const whereCondition = {};
    whereCondition[field] = {
      like: `${searchTerm}.*`,
      options: 'i'
    };

    return this.http.get('/management-user', {
      params: {
        filter: JSON.stringify({ skip: 0, limit: 10, where: whereCondition, fields: [field] })
      }
    }).pipe(map((m: any) => {
      return m?.data?.map(item => item[field]);
    }));
  }
}
