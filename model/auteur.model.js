import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config.js";

export class Auteur extends Model {}

Auteur.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biographie: {
      type: DataTypes.STRING,
      allowNull: true, // La biographie de l'auteur peut être nulle
    }
  },
  {
    sequelize,
    modelName: "Auteur", // nom du model
    tableName: "Auteurs", //Nomde la table 
    timestamps: false, // Pas de createdAt/updatedAt 
  }
);

export default Auteur;
