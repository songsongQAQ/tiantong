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
    return {
      id,
      body,
      this: this,
      str: 'add user',
      userService: this.userService.getUser(),
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
