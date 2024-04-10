import { Server } from 'tiantong'
import { TestController } from './modules/test/user.controller.ts'
import { UserController } from './modules/user/user.controller.ts'

const user = new UserController()
const test = new TestController()

Bun.serve({
  port: 3000,
  async fetch(req): Promise<any> {
    return new Server([user, test]).handleRequest(req)
  },
})
