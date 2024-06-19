import { Component } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent implements ICellRendererAngularComp {
  taskId!: string;
  constructor(private readonly _taskService: TaskService, private toast : ToastrService) {}
  agInit(params: ICellRendererParams): void {
    this.taskId = params.data.id;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  deleteTask() {
    this._taskService.deleteTask(this.taskId).subscribe(
      (res: any) => {
        this.toast.info(`${res.message}`,'Success !!',{
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        })
      },
      (err) => {
        console.log(err);
        this.toast.info(`${err.message}`, "Error !!",{
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        })
      }
    );
  }

  
}
