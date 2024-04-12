import { Controller, Get } from '~/lib/index.ts'

@Controller('user')
export class UserController {
  constructor() {}

  @Get('/')
  getUser() {
    return 'user'
  }
}
