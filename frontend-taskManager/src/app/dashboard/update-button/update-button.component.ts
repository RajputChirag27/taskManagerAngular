import { Component, Input } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss']
})
export class UpdateButtonComponent implements ICellRendererAngularComp {
  @Input() taskId!: string;
  constructor(private router : Router){
  }
  agInit(params: ICellRendererParams): void {
    this.taskId = params.data.id;
  }
 refresh(params: ICellRendererParams) {
   return true;
 }
  updateTask(taskId :string){
    this.router.navigateByUrl(`taskManager/${this.taskId}`)
    // alert("hello "+ taskId)
  }

//   columnDefs: ColDef[] = [
//     { field: "update", cellRenderer: UpdateButtonComponent },
//  ];
}


