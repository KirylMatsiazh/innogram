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
    id: string = randomUUID();                  //VARCHAR(36) PRIMARY KEY, -- ID generated in application code

    @ManyToOne(() => Chat, {onDelete: "CASCADE"})
    @JoinColumn({ name: "chat_id" })
    @Column({
        name: "chat_id",
        type: "varchar",
        length: 36,
        nullable: false,
    })
    chatId: string;                     //VARCHAR(36) NOT NULL REFERENCES chats(id) ON DELETE CASCADE,

    @ManyToOne(() => Profile, {onDelete: "CASCADE"})
    @JoinColumn({ name: "profile_id" })
    @Column({
        name: "profile_id",
        type: "varchar",
        length: 36,
        nullable: false,
    })
    profileId: string;                  //VARCHAR(36) NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    @Column({
        name: "content",
        type: "text",
        nullable: false,
    })
    content: string;                     //TEXT NOT NULL,

    @ManyToOne(() => Message, {onDelete: "SET NULL"})
    @JoinColumn({ name: "reply_to_message_id" })
    @Column({
        name: "reply_to_message_id",
        type: "varchar",
        length: 36,
        nullable: true,
    })
    replyToMessageId: string | null;                     //VARCHAR(36) REFERENCES messages(id) ON DELETE SET NULL,

    @Column({
        name: "is_edited",
        type: "boolean",
        nullable: false,
        default: false,
    })
    isEdited: boolean = false;                   //BOOLEAN NOT NULL DEFAULT false,

    @Column({
        name: "created_at",
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;                  //TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    @ManyToOne(() => User)
    @JoinColumn({ name: "created_by" })
    @Column({
        name: "created_by",
        type: "varchar",
        length: 36,
        nullable: false,
    })
    createdBy: string                  //VARCHAR(36) NOT NULL REFERENCES users(id),

    @Column({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt: Date                 //TIMESTAMP NOT NULL,

    @ManyToOne(() => User)
    @JoinColumn({ name: "updated_by" })
    @Column({
        name: "updated_by",
        type: "varchar",
        length: 36,
        nullable: true,
    })
    updatedBy: string | null;                  //VARCHAR(36) REFERENCES users(id),

    @Column({
        name: "deleted",
        nullable: false,
        default: false,
    })
    deleted: boolean = false;                     //BOOLEAN NOT NULL DEFAULT FALSE
}