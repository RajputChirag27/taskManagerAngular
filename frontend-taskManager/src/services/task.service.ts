import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';

  constructor(private http : HttpClient) { }

  createTask(data : any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

}
