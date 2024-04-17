import { Module } from '../../../src'
//import { Module } from 'tiantong-test'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
