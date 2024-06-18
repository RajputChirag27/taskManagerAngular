import { injectable } from 'inversify';
import { ITaskService } from '../interfaces/services/ITaskService';
import { ITask } from '../interfaces';
import { Task } from '../models/taskModel';

@injectable()
export class TaskService implements ITaskService {
  async getAllTasks(): Promise<ITask[]> {
    return await Task.find();
  }

  async getTaskById(id: number): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async createTask(task: ITask): Promise<ITask> {
    const newTask = new Task(task);
    return await newTask.save();
  }

  async updateTask(id: number, taskUpdates: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskUpdates, { new: true });
  }

  async deleteTask(id: number): Promise<void> {
    await Task.findByIdAndDelete(id);
  }
}
