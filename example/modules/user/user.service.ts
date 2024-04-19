import { Injectable, PrismaService } from '../../../src'
//import { Injectable } from 'tiantong-test'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async createUser(data: any) {
    return this.prisma.user.create({
      data,
    })
  }
}
