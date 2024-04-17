import { Module } from 'tiantong-test'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule],
})
export class AppModule {}
