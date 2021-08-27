import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productName: string;
  
  @Column({ nullable: false })
  ward: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  unitPrice: number;
  
  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  paymentMode: string;

  @Column({ nullable: false })
  direction: string;
  
  @Column({ nullable: false })
  deliveryType: string;

  @Column({ nullable: false })
  produceType: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  productImage: string;
}