import { Body, Controller, Get, Post, Query } from 'tiantong'

@Controller('user')
export class UserController {
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

  @Post('add')
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
