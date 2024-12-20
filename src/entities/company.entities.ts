import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Layout } from './layout.entities'

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  idempresa: string

  @Column()
  txnome_empresa: string

  @Column()
  logo_url: string

  @ManyToOne(() => Layout, { cascade: true })
  layout: Layout

  @CreateDateColumn()
  dtoperacao_inclusao: Date

  @UpdateDateColumn()
  dtoperacao_alteracao: Date

  constructor() {
    if (!this.idempresa) {
      this.idempresa = uuid()
    }
  }
}
