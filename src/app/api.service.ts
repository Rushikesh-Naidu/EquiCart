import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:3000/api"

  constructor(
    private http: HttpClient
  ) { }

  getMethod(url:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${url}`);
  }

  getMethodById(url : any, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}/${id}`);
  }

  postMethod(url:any, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, body);
  }

  putMethod(url : any, id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${url}/${id}`, body, httpOptions);
  }

  deletePost(url: any,id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${url}/${id}`);
  }
}
