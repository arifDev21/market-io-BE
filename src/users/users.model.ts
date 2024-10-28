import { Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone_number: string;

  @Column({ type: 'BLOB', allowNull: true })
  photo: Buffer;

  @Column({ defaultValue: true })
  isActive: boolean;

  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
