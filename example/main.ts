import { Factory } from 'tiantong-test'
import { AppModule } from './app.module'

Factory.create({ module: AppModule })
Factory.listen(3000)
