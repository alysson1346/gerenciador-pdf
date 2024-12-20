import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Empresa } from './company.entities'

@Entity('layout')
export class Layout {
  @PrimaryGeneratedColumn('uuid')
  idlayout: string

  @Column()
  layout_html: string

  @Column('json')
  schema: object

  @OneToMany(() => Empresa, empresa => empresa.idempresa, { eager: true })
  companies: Empresa[]

  @CreateDateColumn()
  dtoperacao_inclusao: Date

  @UpdateDateColumn()
  dtoperacao_alteracao: Date

  constructor() {
    if (!this.idlayout) {
      this.idlayout = uuid()
    }
  }
}
