import * as bcrypt from 'bcrypt';

export class HashPassword {
  static saltOrRound = process.env.SALTORROUND;

  static async generateSalt(salt) {
    return await bcrypt.genSalt(salt);
  }

  static async hashPassword(password: string) {
    const salt = await this.generateSalt(this.saltOrRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  static async comparePassword(password: string, hashedPassword: string) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  }
}
