export interface IdentityMeDto {
  userId: string;
  email: string;
  memberships: unknown[]; // tu peux typer plus tard
}

export interface IdentityPort {
  getMe(params: { accessToken: string; correlationId?: string }): Promise<IdentityMeDto>;
}
