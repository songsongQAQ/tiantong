import { UserService } from '@/modules/user/user.service.ts'
import { Body, Controller, Get, Param, Post } from '~/lib/index.ts'

@Controller('user')
export class UserController {
  test: string
  constructor(private userService: UserService) {
    this.test = 'test1111'
  }

  @Get('')
  getUser(@Param('id') id: number) {
    return {
      id,
    }
  }
  @Post('add')
  addUser(@Body() body: any, @Body('id') id: number) {
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
