import { IsNotEmpty,IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity('admin')
export class Admin{
    @PrimaryColumn() 
    @IsNotEmpty()
    @IsString()
    orientation: string;
    @Column() 
    adminPassword:string;
    constructor(admin?:Partial<Admin>){
        Object.assign(this,admin);
    }
}