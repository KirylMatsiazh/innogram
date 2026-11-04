import { randomUUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Post } from "./post.entity.js";
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "posts_likes" })
@Unique(["post", "profile"])
export class PostLike {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();                  // ID generated in application code

    @ManyToOne(() => Post, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "post_id" })
    post: Post;

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;   //person who liked

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
