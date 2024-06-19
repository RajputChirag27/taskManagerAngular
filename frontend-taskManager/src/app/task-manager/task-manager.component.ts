import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/services/task.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent {
  addTask!: FormGroup; // Define your form group
  isEditMode: boolean = false;
  taskId!: string | null;
  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

    this.addTask = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required, Validators.pattern('.{15,}')]],
      status: ['', Validators.required],
    });

    if (this.isEditMode && this.taskId) {
      this._taskService.getTaskById(this.taskId).subscribe(
        (res) => {
          this.addTask.patchValue(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  get task() {
    return this.addTask.controls;
  }

  onSubmit() {
    if (this.addTask.valid) {
      // Handle form submission logic
      console.log('Form submitted successfully!', this.addTask.value);
      if(this.isEditMode && this.taskId){
       this._taskService.updateTask(this.taskId, this.addTask.value).subscribe(
        (res : any) => {
          this.toastr.info(`Task Updated Successfully!!`, `Success!!`, {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });      
          this.router.navigate(['dashboard']);    
        },
        (err : any) =>{
          console.error(err);
          this.toastr.error(err.message, "Error !!")
        }
       )
      } else{
        this._taskService.createTask(this.addTask.value).subscribe(
          (res) => {
            console.log(res);
            this.toastr.info(`Task Added Successfully!!`, `Success!!`, {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
            this.router.navigate(['dashboard']);
          },
          (err) => {
            console.error(err);
          }
        );
      }
 
    } else {
      // Mark all fields as touched to display validation errors
      this.addTask.markAllAsTouched();
    }
  }
}
