const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Dog extends Model {}

Dog.init(
  {
    // define columns
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        }
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['male', 'female']]
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true,
        }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    for_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        const str = newUserData.name;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return str2
      }, 
      beforeUpdate: async (updatedUserData) => {
          const str = updatedUserData.name;
          const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
          return str2
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dog',
  }
);

module.exports = Dog;