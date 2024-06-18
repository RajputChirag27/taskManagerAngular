import { ITask } from "../ITask";

export interface ITaskService {
  getAllTasks(): Promise<ITask[]>;
  getTaskById(id: number): Promise<ITask | null>;
  createTask(task: ITask): Promise<ITask>;
  updateTask(id: number, task: Partial<ITask>): Promise<ITask | null>;
  deleteTask(id: number): Promise<void>;
}
