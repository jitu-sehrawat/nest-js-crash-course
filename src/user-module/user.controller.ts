import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from './interface/user';
import { UserService } from './user.service';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { HttpExceptionFilter } from './filter';
import { AuthGuard } from './guard';
import { LoggingInterceptor } from './interceptor';
// import { JoiValidationPipe } from './pipe';

@Controller('users')
// @UseGuards(AuthGuard) // Controller level
// @UseInterceptors(LoggingInterceptor) // Controller Level
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  // GET /users/:email
  @Get('/:email')
  @UseGuards(new AuthGuard()) // Route Gaurds like roles, jwt etc. At route level, can be done controller. See above
  @UseInterceptors(new LoggingInterceptor()) // Route level. Intercept the request before and after processing. Also presennt at Global level as weill
  @HttpCode(204) // Defining status code for response
  @Header('Cache-Control', 'none') // Setting headers for response
  @UseFilters(new HttpExceptionFilter()) // Custom http exception handler.
  getUser(
    @Param() params: UserParamsDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // console.log(req); // Similar to expressjs req, res.
    const data = this.userService.getUser(params.email);
    res.status(HttpStatus.FOUND).send(data);
  }

  // POST /users
  @Post()
  // Pipes allow us to use validation. UserDto contains the keys we require and Pipe use 'class-validator'
  // to read the dto file and does validation of request params, query or body.
  @UsePipes(new ValidationPipe())
  // OR
  // // Customer Validatio using Joi. Pass the Obejctschema for postuser route and it will be handled using Joi.
  // @UsePipes(new JoiValidationPipe({ ObjectSchema }))
  async postUser(@Body() user: UserDto): Promise<User> {
    return this.userService.addUser(user);
  }

  // DELETE /users/email@gmail.com
  @Delete('/:email')
  deleteUSer(@Param() params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}
