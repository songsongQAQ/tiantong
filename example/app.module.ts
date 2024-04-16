import { Module } from '../src'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule],
})
export class AppModule {}
