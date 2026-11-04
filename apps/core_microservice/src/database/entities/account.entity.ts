import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity.js";
import { randomUUID } from "crypto";

@Entity({ schema: "auth", name: "accounts" })
export class Account {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ name: "password_hash", type: "varchar", length: 255 })
    passwordHash: string;

    @Column({ type: "varchar", length: 20, default: "local" })
    provider: string;

    @Column({ name: "provider_id", type: "varchar", length: 255, nullable: true })
    providerId: string | null;

    @Column({ name: "last_login_at", type: "timestamp", nullable: true })
    lastLoginAt: Date | null;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @Column({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "updated_by" })
    updatedBy: User | null;
}
