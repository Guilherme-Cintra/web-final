import { Router } from "express"
import { authenticateToken } from "../middlewares/autehnticateToken.js";
import { authorize } from "../middlewares/authorize.js";
import { validateLivre } from "../validation/livre.validation.js";
import { createLivre, deleteLivre, getAllBookss, getLivreById, updateLivre } from "../controllers/livre.controller.js"

const livreRoute = Router() //création d'une instance de router

livreRoute.get('/',getAllBookss )
livreRoute.get('/:id',getLivreById )
livreRoute.post('/',authenticateToken, authorize(['admin']),validateLivre, createLivre)
livreRoute.put('/update/:id',authenticateToken, authorize(['admin']),validateLivre, updateLivre)
livreRoute.delete('/delete/:id',authenticateToken, authorize(['admin']), deleteLivre)

export default livreRoute// Exporter le router