import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
}