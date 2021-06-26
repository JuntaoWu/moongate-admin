import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Contacts, RecentUsers, User, UserData } from './data/users';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserData {

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(): Observable<User[]> {

    return this.http.get('/whoAmI')
      .pipe(map(
        (m: any) => {
          return [{
            name: m?.data?.username,
            picture: ''
          }];
        }
      ));
  }
  getContacts(): Observable<Contacts[]> {
    throw new Error('Method not implemented.');
  }
  getRecentUsers(): Observable<RecentUsers[]> {
    throw new Error('Method not implemented.');
  }
}
