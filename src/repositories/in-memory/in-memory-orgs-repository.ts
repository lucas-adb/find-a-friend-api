import { Prisma, Org } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository.js';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }
}
