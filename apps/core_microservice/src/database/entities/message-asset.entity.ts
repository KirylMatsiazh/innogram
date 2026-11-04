import { randomUUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Asset } from "./asset.entity.js";
import { Message } from "./message.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "messages_assets" })
@Unique(["message", "asset"])                   // UNIQUE(message_id, asset_id)
export class MessageAsset {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();                  // ID generated in application code

    @ManyToOne(() => Message, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "message_id" })
    message: Message;

    @ManyToOne(() => Asset, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "asset_id" })
    asset: Asset;

    @Column({ name: "order_index", type: "integer", default: 0 })
    orderIndex: number;

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
