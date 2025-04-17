import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, unique: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
