import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';

@Entity('tb_users_auth')
export class Auth {
    @PrimaryGeneratedColumn()
    idtb_users_auth: number;

    @Column()
    idtb_users: number;

    @ManyToOne(() => Users, (user) => user.sessions, { eager: false })
    @JoinColumn({ name: 'idtb_users' })
    user: Users;

    @Column({ type: 'text', nullable: true })
    access_token?: string | null;

    @Column({ type: 'text', nullable: true })
    refresh_token?: string | null;

    @Column({ length: 100, nullable: true })
    ip_address?: string;

    @Column({ length: 255, nullable: true })
    user_agent?: string;

    @Column({ length: 100, nullable: true })
    device_name?: string;

    @Column({ default: false })
    is_revoked: boolean;

    @Column({ default: true })
    session_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    refresh_token_expires_at?: Date | null;

    @Column({ type: 'timestamp', nullable: true, default: null })
    revoked_at?: Date | null;

    @Column({ type: 'timestamp', nullable: true, default: null })
    last_used_at?: Date | null;
}