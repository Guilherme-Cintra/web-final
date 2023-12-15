import { Router } from "express"
import { createAuteur, deleteAuteur, getAllAuthors, getAuteurById, updateAuteur } from "../controllers/auteur.controller.js"
import { authenticateToken } from "../middlewares/autehnticateToken.js";
import { authorize } from "../middlewares/authorize.js";
import { validateAuteur } from "../validation/auteur.validation.js";

const auteurRoute = Router()

auteurRoute.get('/',getAllAuthors ) //prendre la liste des auteurs
auteurRoute.get('/:id',getAuteurById ) // prendre un auteur spécifique
auteurRoute.post('/',authenticateToken, authorize(['admin']), createAuteur) //créer auteur
auteurRoute.put('/update/:id',authenticateToken, authorize(['admin']),validateAuteur, updateAuteur) //mettre auteur à jour
auteurRoute.delete('/delete/:id',authenticateToken, authorize(['admin']), deleteAuteur) // supprimer auteur

export default auteurRoute //Exporter le router