## Quick Start

> 基于bun的类springboot框架


### In Node.js

```bash
npm install tiantong --save

import { Factory } from 'tiantong'
import { AppModule } from './app.module'
Factory.create({ module: AppModule })
Factory.listen(3000)
```
## Module
```js
import { UserController } from '@/modules/user/user.controller.ts'
import { UserService } from '@/modules/user/user.service.ts'
import { Module }  from 'tiantong'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class TestModule {}

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
## Server

```js
import { Injectable } from 'tiantong'

@Injectable()
export class UserService {
  getUser() {
    return 'test'
  }
}


```
