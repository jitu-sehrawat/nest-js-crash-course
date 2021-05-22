import {
  Body,
  Delete,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskDto, TaskParamDto, TaskQueryParamDto } from './dto/task.dto';
import { TaskService } from './task-sevice';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @Get('/filter/data')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async filterTasksById(
    @Query() reqQuery: TaskQueryParamDto,
    @Res() res: Response
  ) {
    const data = await this.taskService.fitlerTask(reqQuery.filter);
    return res.status(200).send(data);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.getTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.deleteTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}
