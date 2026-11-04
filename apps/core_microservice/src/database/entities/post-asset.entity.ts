import { randomUUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Asset } from "./asset.entity.js";
import { Post } from "./post.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "posts_assets" })
@Unique(["post", "asset"])                      // UNIQUE(post_id, asset_id)
export class PostAsset {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();                  // ID generated in application code

    @ManyToOne(() => Post, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "post_id" })
    post: Post;

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
