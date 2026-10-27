import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity.js";
import { randomUUID } from "crypto";

@Entity({ schema: "main", name: "profiles" })
export class Profile {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "varchar", length: 50, unique: true })
    username: string;

    @Column({ name: "display_name", type: "varchar", length: 100 })
    displayName: string;

    @Column({ type: "date" })
    birthday: string;

    @Column({ type: "text", nullable: true })
    bio: string | null;

    @Column({ name: "avatar_url", type: "varchar", length: 500, nullable: true })
    avatarUrl: string | null;

    @Column({ name: "is_public", type: "boolean", default: true })
    isPublic: boolean;

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

    @Column({ type: "boolean", default: false })
    deleted: boolean;
}
