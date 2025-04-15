import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('games')
export class GamesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  platforms: any;

  @Column({ type: 'date', name: 'release-date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  coverImage: string;
}
