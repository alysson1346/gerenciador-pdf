import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Empresa } from './empresa.entities';

@Entity('layout')
export class Layout {
  @PrimaryGeneratedColumn('uuid')
  idlayout: string;

  @Column('text')
  layout_html: string;

  @Column('json', { nullable: true })
  schema: object;

  @ManyToOne(() => Empresa, empresa => empresa.layout)
  @JoinColumn({ name: 'idempresa' })
  idempresa: Empresa;

  @CreateDateColumn()
  dtoperacao_inclusao: Date;

  @UpdateDateColumn()
  dtoperacao_alteracao: Date;

  constructor() {
    if (!this.idlayout) {
      this.idlayout = uuid();
    }
  }
}
