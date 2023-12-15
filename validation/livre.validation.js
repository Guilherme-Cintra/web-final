import Joi from "joi";

//valider le titre avec au moins 3 characters et le format YYYY pour l'année, et tous les autres champs sont required
const livreSchema = Joi.object({
    titre : Joi.string().min(3).required(),
    auteurId: Joi.number().required(),
    annee: Joi.string().pattern(/^[0-9]{4}$/, 'année').required(),
    genre: Joi.string().required()
});

export const validateLivre = (req, res, next) => {
    const { error } = livreSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Erreur validation' });
    }
    next();
}