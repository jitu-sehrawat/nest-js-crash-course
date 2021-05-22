import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      email: 'asdsadsada',
      username: 'adsadsadasdas'
    }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(email: User['email']): User {
    const userData = this.users.filter((user) => user.email == email);
    if (userData && Array.isArray(userData) && userData.length > 0) {
      return userData[0];
    }

    throw new NotFoundException('User not found');
  }

  addUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  deleteUser(email: User['email']): User[] {
    const remainingUser = this.users.filter((user) => user.email != email);
    this.users = remainingUser;
    return remainingUser;
  }
}
