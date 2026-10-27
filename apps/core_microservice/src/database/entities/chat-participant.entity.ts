import { randomUUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Chat } from "./chat.entity.js"; 
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "chats_participants" })
@Unique(["profile", "chat"])                    // UNIQUE(profile_id, chat_id)
export class ChatParticipant {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();                  // ID generated in application code

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @ManyToOne(() => Chat, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "chat_id" })
    chat: Chat;

    @Column({ type: "varchar", length: 20, default: "member" })
    role: 'admin' | 'member' = "member";                       // 'admin' | 'member' (validated in code)

    @Column({ name: "joined_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    joinedAt: Date;

    @Column({ name: "left_at", type: "timestamp", nullable: true })
    leftAt: Date | null;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "updated_by" })
    updatedBy: User | null;
}
