import { Controller, Get, Post } from '~/lib/index.ts'

@Controller('user')
export class UserController {
  test: string
  constructor() {
    this.test = 'test1111'
  }

  @Get('')
  getUser() {
    return 'test'
  }
  @Post('add')
  addUser() {
    return {
      test: this.test,
      str: 'add user',
    }
  }
}
