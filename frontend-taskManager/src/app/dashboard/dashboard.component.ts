import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { ColDef } from 'ag-grid-community'; 
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UpdateButtonComponent } from './update-button/update-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  rowData: any[] = [];
  subscription!: Subscription;
  private updateListenerSubscription!: Subscription;


  public rowSelection: "single" | "multiple" = "multiple";
  public rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  public pivotPanelShow: "always" | "onlyWhenPivoting" | "never" = "always";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  constructor(private readonly _taskService: TaskService,  private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadTasks();

    this.updateListenerSubscription = this._taskService.getTasksUpdatedListener().subscribe(() => {
      this.loadTasks();
    });
  }


  private loadTasks() {
    this.subscription = this._taskService.getTasks().subscribe(
      (res: any) => {
        this.tasks = res;
        this.rowData = res.map((task: any) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          status: this.capitalizeFirstLetter(task.status),
          createdAt: this.formatDate(task.createdAt),
          updatedAt: this.formatDate(task.updatedAt),
        }));
      },
      (err: any) => console.log(err)
    );
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  colDefs: ColDef[] = [
    { headerName: 'Title', field: 'title', flex: 1, filter: 'agTextColumnFilter' },
    { headerName: 'Description', field: 'description', flex: 3, filter: 'agTextColumnFilter' },
    { headerName: 'Status', field: 'status', flex: 1 , filter:'agTextColumnFilter'},
    { headerName: 'Created At', field: 'createdAt', flex: 1, filter: 'agDateColumnFilter' },
    { headerName: 'Updated At', field: 'updatedAt', flex: 1, filter: 'agDateColumnFilter' },
 {
      headerName: 'Update', field: 'update', cellRenderer: UpdateButtonComponent, autoHeight: true,
    },
    {
      headerName: 'Delete', field: 'delete', cellRenderer: DeleteButtonComponent, autoHeight: true,
    }

  ];  

  private capitalizeFirstLetter(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }
  
  private formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'short');
  }


}
