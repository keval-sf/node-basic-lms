import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Role, User } from '../../models';

interface CustomerAttributes {
  customerId?: number;
  name: string;
  website: string;
  userId: number;
  roleId: number;
  user?: User;
}

@Table({
  schema: 'users.master',
  tableName: 'customers',
  timestamps: false,
})
export class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  customerId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Customer is required",
      },
      notEmpty: {
        msg: "Customer cannot be empty",
      },
    },
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "User is required",
      },
      notEmpty: {
        msg: "User cannot be empty",
      },
    },
  })
  userId!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Role is required",
      },
      notEmpty: {
        msg: "Role cannot be empty",
      },
    },
  })
  roleId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Role)
  role!: Role;
}
