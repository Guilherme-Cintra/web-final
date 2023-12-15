import Joi from "joi" //Import de Joi pour la validation de l'utilisateur

//Pour un utilisateur valide les deux champs email et mot de passe doivent être présents(required) et il faut au moins 8 caractères pour un mot de passe
const validationUtilisateur = Joi.object({
    email :Joi.string().required(),
    motDePasse: Joi.string().min(8).required(),
    role: Joi.string().required()
})

//fonction exporté vers les routes qui valide les champs des utilisateurs 
export const validateUtilisateur = (req, res, next) => {
    const { error} = validationUtilisateur.validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}