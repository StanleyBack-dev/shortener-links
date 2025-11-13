import * as bcrypt from 'bcrypt';

export async function HashPassword(password: string, saltRounds = 10): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function ComparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}