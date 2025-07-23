import { Prisma, Org } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository.js';
import { prisma } from '@/lib/prisma.js';

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
