import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user-holdings')
export class UserHolding {
    
  @PrimaryColumn()
  email: string;

  @Column()
  pool_address: string;

  @Column({ type: 'numeric', precision: 18, scale: 6 })
  num_lp_tokens: number;

  @CreateDateColumn()
  created_at: Date;
}
