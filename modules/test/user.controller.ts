import { Body, Controller, Get, Post, Query } from '../../src'

@Controller('test')
export class TestController {
  test: string
  constructor() {
    this.test = 'xxx'
  }
  @Get()
  getUser(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query() query: any
  ) {
    return {
      id,
      name,
      query,
    }
  }

  @Post('edit')
  addUser(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body() body: any
  ) {
    return {
      id,
      body,
    }
  }
}
