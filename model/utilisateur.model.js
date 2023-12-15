import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config.js";

export class Utilisateur extends Model {}

Utilisateur.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true //Chaque courriel doit être unique
    },
    motDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  },
  {
    sequelize,
    modelName: "Utilisateur",
    tableName: "Utilisateurs",
    timestamps: false, // Pas de createdAt/updatedAt
  }
);

export default Utilisateur;
