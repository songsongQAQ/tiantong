## Quick Start

> 如果你想体验轻量级的nest


### In Node.js

```bash
npm install tiantong --save
```
## Server
```js
import { Server } from 'tiantong'
import { UserController } from './modules/user/user.controller.ts'

const user = new UserController()
Bun.serve({
  port: 3000,
  async fetch(req): Promise<any> {
    return new Server([user]).handleRequest(req)
  },
})
```
## Controller
```js
import { Body, Controller, Get, Post, Query } from 'tiantong'

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

```
