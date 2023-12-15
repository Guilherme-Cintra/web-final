import Auteur from "../model/auteur.model.js";

export const getAllAuthors = async (req, res, next) => {
    try {
      // Trouver tous les auteurs avec find all
      const auteurs = await Auteur.findAll();
      // Envoie les auteurs
      res.status(200).json(auteurs);
    } catch (error) {
      // S'il y a une erreur au passe au prochain middleware
      next(error);
    }
  };
  
  // Récupère un auteur parid
  export const getAuteurById = async (req, res, next) => {
    try {
      // Recherche l'auteur par sa clée primaire
      const auteur = await Auteur.findByPk(req.params.id);
      if (auteur) {
        // Si on trouve un auteur on l'envoie en json avec le statut 200
        res.status(200).json(auteur);
      } else {
        // Si aucun auteur n'est trouvé on envoie le message
        res.status(404).json({ message: 'auteur non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // Créer nouvel auteur
  export const createAuteur = async (req, res, next) => {
    try {
      // Create de sequelize pour créer un nouvel auteur
      const auteur = await Auteur.create(req.body);
      // Envoie l'auteur créé
      res.status(201).json(auteur);
    } catch (error) {
      next(error);
    }
  };
  
  // Update auteur
  export const updateAuteur = async (req, res, next) => {


    try {
      //recupérer les données du corps de la requête
      const { nom, biographie } = req.body;
      // Trouver auteur par son id
      const auteur = await Auteur.findByPk(req.params.id);
      if (auteur) {
        //update avec sequelize de l'auteur trouvé
        await auteur.update({ nom, biographie });
        // Evoie les donées de l'auteur en json
        res.status(200).json(auteur);
      } else {
        // Si l'auteur n'est pas trouvé on envoie le message
        res.status(404).json({ message: 'Auteur non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // DELETE auteur
  export const deleteAuteur = async (req, res, next) => {
    try {
        // Trouver auteur par son id
      const auteur = await Auteur.findByPk(req.params.id);
      if (auteur) {
        // Détruire l'auteur avec sequelize
        await auteur.destroy();
        // Dire au client que l'auteur a été supprimé
        res.status(200).json({ message: 'Auteur supprimé' });
      } else {
        // Si aucun auteur n'est trouvé
        res.status(404).json({ message: 'auteur non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  