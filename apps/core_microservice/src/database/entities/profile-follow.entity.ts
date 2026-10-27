import { randomUUID } from "node:crypto";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Profile } from "./profile.entity.js";
import { User } from "./user.entity.js";

@Entity({ schema: "main", name: "profiles_follows" })
@Unique(["followerProfile", "followedProfile"])
@Check("follower_profile_id != followed_profile_id")
export class ProfileFollow {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();                  // ID generated in application code

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "follower_profile_id" })
    followerProfile: Profile;

    @ManyToOne(() => Profile, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "followed_profile_id" })
    followedProfile: Profile;

    @Column({ type: "boolean", nullable: true })
    accepted: boolean | null;                   // BOOLEAN, nullable, no default

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
