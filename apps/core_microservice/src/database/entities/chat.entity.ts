import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "chats" })
export class Chat {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @Column({ type: "varchar", length: 20, default: "private" })
    type: string;

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
