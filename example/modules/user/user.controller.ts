import { Body, Controller, Get, Param, Post, Query } from '../../../src'
//import { Body, Controller, Get, Param, Post, Query } from 'tiantong-test'
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

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const data = await this.userService.getUserById(Number(id))
    console.log('data----------', data)
    return data
  }

  @Post('add')
  async addUser(@Body() body: any): Promise<any> {
    body.email = `${Math.random()}${body?.email}`
    body.name = `${Math.random()}${body?.name}`
    return this.userService.createUser(body)
  }
}
