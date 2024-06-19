import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ITaskService } from '../interfaces/services/ITaskService';
import { controller, httpGet, httpPost, httpPut, httpDelete } from 'inversify-express-utils';
import { TYPES } from '../constants';
import { ApiHandler } from '../handlers/apiHandler';
import { CustomError } from '../helpers';
import { statusCode } from '../constants';
import { errorHandler } from '../handlers';
import { AuthMiddleware } from '../middlewares';
import { AuthRequest } from '../interfaces';
@controller('/tasks')
export class TaskController {
  constructor(@inject(TYPES.TaskService) private taskService: ITaskService) {}

  @httpGet('/')
  public async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskService.getAllTasks();
    res.json(tasks);
  }

  @httpGet('/tasksUser',TYPES.AuthMiddleware)
  public async getAllTasksByUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try{
      console.log("hello")
      console.log(req.user._id);
      const id = req.user._id;
      console.log(id)
      const tasks = await this.taskService.getAllTasksByUser(id);
      res.json(tasks);
    }catch(err){
      if (!res.headersSent) errorHandler(req, res, next, err);
    }

  }
  
  @httpPost('', TYPES.AuthMiddleware)
  public async createTask(req: AuthRequest, res: Response): Promise<void> {
    const id = req.user._id;
    const task = await this.taskService.createTask(req.body,id);
    res.status(201).json(task);
  }

  @httpPut('/:id')
  public async updateTask(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const task = await this.taskService.updateTask(id, req.body);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  
  @httpGet('/:id')
  public async getTaskById(req: Request, res: Response, next : NextFunction): Promise<void> {
    try{
      const id = req.params.id;
      const task = await this.taskService.getTaskById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).send('Task not found');
      }
    }
    catch(err){
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }


  @httpDelete('/:id')
  public async deleteTask(req: Request, res: Response, next : NextFunction): Promise<void> {
    try{
      const id = req.params.id;
      const result = await this.taskService.deleteTask(id);
      console.log("result "+result)
      if(result!== null){
        res.send(new ApiHandler(result, "Task Deleted Successfully"));
      } else {
        throw new CustomError(
          "User Not Deleted",
          statusCode.BAD_REQUEST,
          "User is not Deleted because User Not Found",
        );
      }
    } catch(err){
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
   
  }
}
