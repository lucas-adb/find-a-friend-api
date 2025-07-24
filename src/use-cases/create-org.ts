import { OrgsRepository } from '@/repositories/orgs-repository.js';
import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error.js';

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async create({
    name,
    email,
    address,
    phone,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      phone,
      password_hash,
    });

    return { org };
  }
}
