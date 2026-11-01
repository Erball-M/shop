import { Injectable } from "@nestjs/common";

import type { Prisma, User } from "../../../prisma/generated/client.js";
import { PrismaService } from "../../infrastructure/prisma/prisma.service.js";

export type CreateUserData = Pick<Prisma.UserCreateInput, "phone" | "email">;

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
