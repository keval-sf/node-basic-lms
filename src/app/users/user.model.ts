import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Customer } from '../../models';

interface UserAttributes {
  userId?: number;
  name: string;
  email: string;
}

@Table({
  schema: 'users.master',
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes> implements UserAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is required",
      },
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  })
  name!: string;

  @Unique({
    name: 'email',
    msg: 'Email address must be unique',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email is required",
      },
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  })
  email!: string;

  @HasMany(() => Customer)
  customers!: Customer[];
}
