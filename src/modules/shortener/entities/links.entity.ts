import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity('tb_links')
export class Links {
  @PrimaryGeneratedColumn()
  idtb_links: number;

  @ManyToOne(() => Users, (user) => user.links, { nullable: true })
  @JoinColumn({ name: 'idtb_users' })
  user?: Users;

  @Column({ unique: true, length: 6 })
  short_code: string;

  @Column({ type: 'text' })
  original_url: string;

  @Column({ default: 0 })
  click_count: number;

  @Column({ type: 'timestamp', nullable: true })
  inactivated_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // GERA O CÓDIGO ENCURTADO AUTOMATICAMENTE SE NÃO TIVER
  @BeforeInsert()
  generateShortCode() {
    if (!this.short_code) {
      this.short_code = Math.random().toString(36).substring(2, 8);
    }
  }
}