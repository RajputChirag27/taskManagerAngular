import {type ObjectId } from "mongoose";
import { ITask } from "../ITask";

export interface ITaskService {
  getAllTasks(): Promise<ITask[]>;
  getTaskById(id: string): Promise<ITask | null>;
  getAllTasksByUser(creatorId: ObjectId): Promise<ITask[]>; 
  createTask(task: ITask, id: ObjectId): Promise<ITask>;
  updateTask(id: string, task: Partial<ITask>): Promise<ITask | null>;
  deleteTask(id: string): Promise<any>;
}
