import { randomUUID } from "node:crypto";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Chat } from "./chat.entity.js";
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "messages" })
export class Message {
    @PrimaryColumn({
        name: "id",
        type: "varchar",
        length: 36,
    })
    id: string = randomUUID();

    @ManyToOne(() => Chat, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "chat_id" })
    chat: Chat;

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @Column({
        name: "content",
        type: "text",
        nullable: false,
    })
    content: string;

    @ManyToOne(() => Message, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "reply_to_message_id" })
    replyToMessage: Message | null;

    @Column({
        name: "is_edited",
        type: "boolean",
        nullable: false,
        default: false,
    })
    isEdited: boolean = false;

    @Column({
        name: "created_at",
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @Column({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "updated_by" })
    updatedBy: User | null;

    @Column({
        name: "deleted",
        type: "boolean",
        nullable: false,
        default: false,
    })
    deleted: boolean = false;
}