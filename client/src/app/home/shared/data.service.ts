import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = '/api/values';
  // url = 'http://192.168.99.100:3050/api/values';

  constructor(private http: HttpClient) { }

  fetchValues(): Observable<any> {
    return this.http.get<any>(this.url + '/current');
  }

  fetchIndexes(): Observable<any> {
    return this.http.get<any>(this.url + '/all');
  }

  submitIndex(index) {
    return this.http.post(this.url, {index: index});
  }
}
