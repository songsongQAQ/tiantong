import { PrismaClient } from '@prisma/client'
import Injectable from '../Injectable'
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super()
  }
}
