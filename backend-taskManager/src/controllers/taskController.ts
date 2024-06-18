import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ITaskService } from '../interfaces/services/ITaskService';
import { controller, httpGet, httpPost, httpPut, httpDelete } from 'inversify-express-utils';
import { TYPES } from '../constants';
@controller('/tasks')
export class TaskController {
  constructor(@inject(TYPES.TaskService) private taskService: ITaskService) {}

  @httpGet('/')
  public async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  }

  @httpGet('/:id')
  public async getTaskById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const task = await this.taskService.getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  @httpPost('')
  public async createTask(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.createTask(req.body);
    res.status(201).json(task);
  }

  @httpPut('')
  public async updateTask(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const task = await this.taskService.updateTask(id, req.body);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  @httpDelete('')
  public async deleteTask(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await this.taskService.deleteTask(id);
    res.status(204).send();
  }
}
