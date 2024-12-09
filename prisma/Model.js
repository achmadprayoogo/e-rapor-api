import { PrismaClient } from "@prisma/client";
class Model {
  constructor() {
    this.prisma = new PrismaClient();
  }
}

export default new Model();
