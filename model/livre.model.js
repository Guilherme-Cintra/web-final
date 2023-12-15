import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config.js";

export class Livre extends Model {}

Livre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auteurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annee: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  },
  {
    sequelize,
    modelName: "Livre",
    tableName: "Livres",
    timestamps: false, // Pas de createdAt/updatedAt
  }
);

export default Livre;
