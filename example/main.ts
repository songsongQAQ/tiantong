//import { Factory } from 'tiantong-test'
import { Factory } from '../src'
import { AppModule } from './app.module'

Factory.create({ module: AppModule })
Factory.listen(3000)
