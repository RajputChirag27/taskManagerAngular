import { ITask } from "../ITask";

export interface ITaskService {
  getAllTasks(): Promise<ITask[]>;
  getTaskById(id: string): Promise<ITask | null>;
  createTask(task: ITask): Promise<ITask>;
  updateTask(id: string, task: Partial<ITask>): Promise<ITask | null>;
  deleteTask(id: string): Promise<any>;
}
