const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Task extends Model {

}

Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {

        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'task',
    }
);

module.exports = Task;
