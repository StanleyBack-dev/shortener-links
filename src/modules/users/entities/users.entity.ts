import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { Auth } from "../../auth/entities/auth.entity";
import { Links } from "../../shortener/entities/links.entity";

@Entity('tb_users')
export class Users {
  @PrimaryGeneratedColumn()
  idtb_users: number;

  @Column({ unique: true })
  public_idtb_users: string;

  @Column({ unique: true, length: 25 })
  username: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 30, unique: true })
  document_number: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ default: true })
  first_access: boolean;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_access_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  inactivated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // RELAÇÃO COM AS SESSÕES DE LOGIN
  @OneToMany(() => Auth, (session) => session.user)
  sessions: Auth[];

  // RELAÇÃO COM OS LINKS ENCURTADOS
  @OneToMany(() => Links, (link) => link.user)
  links: Links[];

  // GERA UM ID PÚBLICO AO CRIAR O USUÁRIO
  @BeforeInsert()
  async generatePublicId() {
    const { nanoid } = await import('nanoid');
    this.public_idtb_users = `USR-${nanoid(10)}`;
  }
}