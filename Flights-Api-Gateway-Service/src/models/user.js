/*
To create this file run the below command in the terminal 
inside the /src directory
npx sequelize model:generate --name User --attributes email:string,password:string
*/
"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One user can have many roles -> Many to Many Associations | Through Table is User_Roles | Eg. 1 user can get `m` no. of roles i.e. When he works in the Airline Company, he is the ADMIN, CUSTOMER, and FLIGHT COMPANY
      this.belongsToMany(models.Role, { through: "User_Roles", as: "role" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  /*
  Hooks in Sequelize
  Before we create a new user we can write a hook/triggers 
  that encrypts/hash the user's password before storing it 
  in the DB.
  */
  User.beforeCreate(function encrypt(user) {
    // user is a plain JS object that is going to be used in order to create an entry in MySQL
    // user is the object before the creation of the record in the MySQL DB
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +ServerConfig.SALT_ROUNDS // converting the string type to a number type using + unary operator
    );
    user.password = encryptedPassword;
  });
  return User;
};
