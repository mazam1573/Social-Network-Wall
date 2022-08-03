import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;

  constructor(private http: HttpClient) { }

  public createNewUser(dataobj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users', dataobj).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      })
    })
  }
  public getUser(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users?email=' + email).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      })
    })
  }
}
