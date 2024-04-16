import { Controller, Get } from '~/lib/index.ts'

@Controller('test')
export class TestController {
  constructor() {}

  @Get()
  getUser() {
    return 'test'
  }
}
