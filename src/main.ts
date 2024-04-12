import { Factory } from '~/lib'
import { AppModule } from './app.module'

Factory.create({ module: AppModule })
Factory.listen(3000)
