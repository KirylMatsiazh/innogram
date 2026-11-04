import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity.js";
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";
import { randomUUID } from "crypto";

@Entity({ schema: "main", name: "comments" })
export class Comment {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();

    @ManyToOne(() => Post, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "post_id" })
    post: Post;

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @ManyToOne(() => Comment, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "parent_comment_id" })
    parentComment: Comment | null;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "created_by" })
    createdBy: User;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "updated_by" })
    updatedBy: User | null;
}
