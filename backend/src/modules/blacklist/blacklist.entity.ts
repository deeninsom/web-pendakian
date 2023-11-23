import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Blacklists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nik: string;

  @Column()
  nama: string;

  @Column()
  no_telepon: string;

  @Column()
  dibuat: string;

  @Column()
  berakhir: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

