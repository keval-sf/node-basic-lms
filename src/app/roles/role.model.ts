import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';

interface RoleAttributes {
  roleId?: number;
  roleName: string;
}

@Table({
  schema: 'common.master',
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model<RoleAttributes> implements RoleAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  roleId!: number;

  @Column({
    type: DataType.STRING,
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
  roleName!: string;
}
