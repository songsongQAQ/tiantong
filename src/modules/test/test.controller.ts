import { Controller, Get } from '~/lib/index.ts'

@Controller('test')
export class TestController {
  constructor() {}

  @Get('test')
  getUser() {
    return 'test'
  }
}
