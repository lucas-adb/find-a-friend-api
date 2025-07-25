import { OrgsRepository } from '@/repositories/orgs-repository.js';
import { Org } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js';
import { compare } from 'bcryptjs';

interface AuthOrgRequest {
  email: string;
  password: string;
}

interface AuthOrgResponse {
  org: Org;
}

export class AuthOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async auth({ email, password }: AuthOrgRequest): Promise<AuthOrgResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, org.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
