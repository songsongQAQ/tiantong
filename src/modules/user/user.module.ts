import { TestController } from '@/modules/test/test.controller.ts'
import { TestService } from '@/modules/test/test.service.ts'
import { Module } from '~/lib'

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class UserModule {}
