import { injectable } from "inversify";
import { ITaskService } from "../interfaces/services/ITaskService";
import { ITask } from "../interfaces";
import { Task } from "../models/taskModel";
import { type ObjectId } from "mongoose";

@injectable()
export class TaskService implements ITaskService {
  async getAllTasks(): Promise<ITask[]> {
    return await Task.find();
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async getAllTasksByUser(creatorId: ObjectId): Promise<ITask[]> {
    return await Task.find({ creatorId: creatorId });
  }

  async createTask(task: ITask, id: ObjectId): Promise<ITask> {
    task.creatorId = id;
    const newTask = new Task(task);
    return await newTask.save();
  }

  async updateTask(
    id: string,
    taskUpdates: Partial<ITask>,
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskUpdates, { new: true });
  }

  async deleteTask(id: string): Promise<any> {
    return await Task.findByIdAndDelete(id);
  }
}
