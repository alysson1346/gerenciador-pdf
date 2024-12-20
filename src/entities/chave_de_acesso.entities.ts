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

import { Empresa } from './empresa.entities'

@Entity('chave_de_acesso')
export class ChaveAcesso {
  @PrimaryGeneratedColumn('uuid')
  idchave_de_acesso: string

  @Column()
  token_acesso: string

  @Column({default:false})
  ativo: boolean

  @OneToOne(() => Empresa, { eager: true })
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
