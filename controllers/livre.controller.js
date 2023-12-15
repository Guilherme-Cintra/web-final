import Livre from "../model/livre.model.js";

export const getAllBookss = async (req, res, next) => {
    try {
      // Trouver tous les livres avec find all
      const livres = await Livre.findAll();
      // Envoie les livres
      res.status(200).json(livres);
    } catch (error) {
      // S'il y a une erreur au passe au prochain middleware
      next(error);
    }
  };
  
  // Récupère livre par id
  export const getLivreById = async (req, res, next) => {
    try {
      // Recherche l'livre par sa clée primaire(ID)
      const livre = await Livre.findByPk(req.params.id);
      if (livre) {
        // Si on trouve un livre on l'envoie en json avec le statut 200
        res.status(200).json(livre);
      } else {
        // Si aucun livre n'est trouvé on envoie le message
        res.status(404).json({ message: 'livre non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // Créer nouveau livre
  export const createLivre = async (req, res, next) => {
    try {
      console.log("Bonjour");
      // Create de sequelize pour créer un nouvel livre
      const livre = await Livre.create(req.body);
      // Envoie le livre créé
      res.status(201).json(livre);
    } catch (error) {
      next(error);
    }
  };
  
  // Update livre
  export const updateLivre = async (req, res, next) => {


    try {
      //recupérer les données du corps de la requête
      const { titre, auteur, annee, genre } = req.body;
      // Trouver livre par son id
      const livre = await Livre.findByPk(req.params.id);
      if (livre) {
        //update avec sequelize de l'livre trouvé
        await livre.update({ titre, auteur, annee, genre });
        // Evoie les donées de l'livre en json
        res.status(200).json(livre);
      } else {
        // Si l'livre n'est pas trouvé on envoie le message
        res.status(404).json({ message: 'livre non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // DELETE livre
  export const deleteLivre = async (req, res, next) => {
    try {
        // Trouver livre par son id
      const livre = await Livre.findByPk(req.params.id);
      if (livre) {
        // Détruire l'livre avec sequelize
        await livre.destroy();
        // Dire au client que l'livre a été supprimé
        res.status(200).json({ message: 'livre supprimé' });
      } else {
        // Si aucun livre n'est trouvé
        res.status(404).json({ message: 'livre non trouvée' });
      }
    } catch (error) {
      next(error);
    }
  };
  