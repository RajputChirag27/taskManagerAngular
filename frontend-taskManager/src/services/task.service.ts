import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';
  private tasksUpdated = new Subject<void>();


  constructor(private http : HttpClient) { }

  createTask(data : any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

  getTasks() : Observable<any>{
    return this.http.get(this.apiUrl);
  }

  deleteTask(id :any){
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      finalize(()=>{
        this.tasksUpdated.next();
      })
    );
  }

  getTasksUpdatedListener(): Observable<void> {
    return this.tasksUpdated.asObservable();
  }

  getTaskById(id : string){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`,data).pipe(
      finalize(()=>{
        this.tasksUpdated.next();
        })
    );
  }

}
