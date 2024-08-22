import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
}

@Table({
  schema: 'users.master',
  tableName: 'users',
  timestamps: false,
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
}
