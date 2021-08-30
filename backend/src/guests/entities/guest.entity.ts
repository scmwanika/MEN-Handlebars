import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false })
  name: String;

  @Column({ nullable: false })
  email: String;

  @Column({ nullable: false })
  phone: String;
  
  @Column({ nullable: false })
  guestNum: Number;

  @Column({ nullable: false })
  accommodationType: String;

  @Column({ nullable: false })
  checkin: String;
  
  @Column({ nullable: false })
  checkout: String;
}
