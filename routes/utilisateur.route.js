import { Router } from "express"
import { deleteUtilisateur, enregistrerUtilisateur, loginUtilisateur, updateUtilisateur,  } from "../controllers/utilisateur.controller.js";
import { authenticateToken } from "../middlewares/autehnticateToken.js";
import { authorize } from "../middlewares/authorize.js";
import { validateUtilisateur } from "../validation/utilisateur.validation.js";

const utilisateurRouter = Router()


//Route pour l'enregistrement
utilisateurRouter.post('/signup', validateUtilisateur, enregistrerUtilisateur);

//Route pour le login
utilisateurRouter.post('/login', loginUtilisateur )

//Route pour la modification d'un utilisateur
utilisateurRouter.put('/update/:id', authenticateToken, authorize(['admin']), updateUtilisateur) // Seulememnt les amdmin peuvent y accéder

//Route pour la suppression d'un utilisateur
utilisateurRouter.delete('/delete/:id', authenticateToken, authorize(['admin']), deleteUtilisateur) // Seulememnt les amdmin peuvent y accéder

export default utilisateurRouter //Exporter le router