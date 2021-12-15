import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Productioncost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  kuantitasProduksi: number;

  @Column({ default: 0 })
  biayaVariable: number;

  @Column({ default: 0 })
  fixedCost: number;

  @Column({ default: 0 })
  totalCost: number;

  @Column({ default: 0 })
  marginalCost: number;
}
