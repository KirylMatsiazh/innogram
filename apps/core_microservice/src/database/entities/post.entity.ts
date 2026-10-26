import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "posts" })
export class Post {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string;

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @Column({ type: "text" })
    content: string;

    @Column({ name: "is_archived", type: "boolean", default: false })
    isArchived: boolean;

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
