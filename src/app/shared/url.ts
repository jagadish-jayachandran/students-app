import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
export const targetUrl = "http://localhost"
export const baseUrl = `${targetUrl}/api/students-api/`;
