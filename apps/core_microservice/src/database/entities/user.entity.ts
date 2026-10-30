import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: "auth", name: "users" })
export class User {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();  //why still requires an id to create an instance?

    @Column({ type: "varchar", length: 20, default: "User" })
    role: string;

    @Column({ type: "boolean", default: false })
    disabled: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "created_by" })
    createdBy: User | null;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "updated_by" })
    updatedBy: User | null;
}
