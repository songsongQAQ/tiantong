import { UserController } from '@/modules/user/user.controller.ts'
import { UserService } from '@/modules/user/user.service.ts'
import { Module } from '~/lib'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class TestModule {}
