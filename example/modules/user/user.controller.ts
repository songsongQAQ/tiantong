import { Body, Controller, Get, Param, Post, Query } from '../../../src'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  test: string
  constructor(private userService: UserService) {
    this.test = 'test1111'
  }

  @Get()
  getUser(@Query('id') id: number) {
    return {
      id,
    }
  }
  @Get(':id/:name')
  getUserById(@Param('id') id: string, @Param('name') name: string) {
    return {
      id,
      name,
    }
  }

  @Post('add')
  addUser(@Body() body: any, @Body('id') id: number): any {
    console.log('id----------', id)
    return {
      id,
      body,
      this: this,
      str: 'add user',
      userService: this.userService?.getUser(),
    }
  }
}
