import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';
import { Task } from '../interface/task';

export class TaskDto {
  @IsDefined()
  @IsString()
  name: Task['name'];

  // Keeping rest of Props as optional
}

export class TaskParamDto {
  @IsUUID()
  @IsDefined()
  id: Task['id'];
}

export class TaskQueryParamDto {
  @IsDefined()
  @IsBoolean()
  // Explicit transforming values of filter from string to boolean.
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  filter: boolean;
}
