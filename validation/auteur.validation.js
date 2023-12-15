import Joi from "joi";

//s'assurer que le nom soit écrit
const auteurSchema = Joi.object({
    nom : Joi.string().required(),
    biographie : Joi.string().allow(null, "")
});

export const validateAuteur = (req, res, next) => {
    const { error } = auteurSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Erreur validation' });
    }
    next();
}