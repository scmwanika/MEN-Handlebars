import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  national_id: string;
  
  @Column({ nullable: false })
  reguser: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  bornon: string;
  
  @Column({ nullable: false })
  registeredon: string;

  @Column({ nullable: false })
  role: string;

  @Column({ nullable: false })
  activities: string;
  
  @Column({ nullable: false })
  wardName: string;

  @Column({ nullable: false })
  residenceType: string;

  @Column({ nullable: false })
  residencePeriod: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;
}