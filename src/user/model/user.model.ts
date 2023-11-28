import { Post } from './../../post/model/post.model';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  modelName: 'User',
  tableName: 'User',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Post)
  posts: Post[];
}
