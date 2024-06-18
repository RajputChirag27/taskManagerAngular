import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent {
  addTask!: FormGroup; // Define your form group

  constructor(private fb: FormBuilder, private _taskService: TaskService, private toastr : ToastrService) {}

  ngOnInit(): void {
    this.addTask = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required, Validators.pattern('.{15,}')]],
      status: ['', Validators.required],
    });
  }

  get task() {
    return this.addTask.controls;
  }

  onSubmit() {
    if (this.addTask.valid) {
      // Handle form submission logic
      console.log('Form submitted successfully!', this.addTask.value);
      this._taskService.createTask(this.addTask.value).subscribe(
        (res) => {
          console.log(res);
          this.toastr.info(`Task Added Successfully!!`, `Success!!`,{
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      // Mark all fields as touched to display validation errors
      this.addTask.markAllAsTouched();
    }
  }
}
