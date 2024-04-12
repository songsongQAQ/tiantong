import { TestModule } from '@/modules/test/test.module.ts'
import { UserModule } from '@/modules/user/user.module.ts'
import { Module } from '~/lib'

@Module({
  imports: [UserModule, TestModule],
})
export class AppModule {}
