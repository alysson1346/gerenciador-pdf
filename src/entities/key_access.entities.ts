import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Empresa } from './company.entities'

@Entity('chave_de_acesso')
export class ChaveAcesso {
  @PrimaryGeneratedColumn('uuid')
  idchave_de_acesso: string

  @Column()
  token_acesso: string

  @Column()
  ativo: boolean

  @OneToOne(() => Empresa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idempresa' })
  idempresa: Empresa

  @CreateDateColumn()
  dtoperacao_inclusao: Date

  @UpdateDateColumn()
  dtoperacao_alteracao: Date

  constructor() {
    if (!this.idchave_de_acesso) {
      this.idchave_de_acesso = uuid()
    }
  }
}
