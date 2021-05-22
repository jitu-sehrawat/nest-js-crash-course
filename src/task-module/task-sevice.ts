import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './interface/task';
import { TaskStoreService } from './task-store-service';

@Injectable()
export class TaskService {
  constructor(private readonly taskstoreservice: TaskStoreService) {}

  public async addTask(task: Task): Promise<Task> {
    task.id = uuidv4();
    task.completed = false;
    task.description = 'dummy';
    task.owner = 'jitu';
    task.duration = 2;
    return this.taskstoreservice.addTask(task);
  }

  public async getTask(id: Task['id']): Promise<Task> {
    return this.taskstoreservice.getTask(id);
  }

  public async deleteTask(id: Task['id']): Promise<Task[]> {
    return this.taskstoreservice.deleteTask(id);
  }

  public async getAllTasks(): Promise<Task[]> {
    return this.taskstoreservice.getAllTasks();
  }

  public async fitlerTask(filter: boolean): Promise<Task[]> {
    return this.taskstoreservice.fitlerTask(filter);
  }
}
