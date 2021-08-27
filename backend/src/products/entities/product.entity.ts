import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  price: number;
  
  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  produceType: string;

  @Column({ nullable: false })
  category: string;
  
  @Column({ nullable: false })
  paymentMode: string;

  @Column({ nullable: false })
  deliveryType: string;

  @Column({ nullable: false })
  customerName: string;

  @Column({ nullable: false })
  customerContact: string;
}