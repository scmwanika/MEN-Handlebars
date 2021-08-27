import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  customerName: string;
  
  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  street: string;
  
  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;
}
