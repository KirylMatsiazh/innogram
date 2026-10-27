import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity.js";
import { randomUUID } from "crypto";

@Entity({ schema: "main", name: "assets" })
export class Asset {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string = randomUUID();

    @Column({ name: "file_name", type: "varchar", length: 255 })
    fileName: string;

    @Column({ name: "file_path", type: "varchar", length: 500 })
    filePath: string;

    @Column({ name: "file_type", type: "varchar", length: 100 })
    fileType: string;

    @Column({ name: "file_size", type: "integer" })
    fileSize: number;

    @Column({ name: "order_index", type: "integer", default: 0 })
    orderIndex: number;

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
