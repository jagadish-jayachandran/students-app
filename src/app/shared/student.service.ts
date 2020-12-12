import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: any = baseUrl + "fetch-student-details.php/";

  constructor(private http: HttpClient) { }
  getListId(tbl, key) {
    return this.http.get<any>(this.baseUrl + tbl + "/" + key);
  }
  getList(tbl): Observable<any> {
    return this.http.get<any>(this.baseUrl + tbl);
  }
}
