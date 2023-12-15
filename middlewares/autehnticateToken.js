import jwt from 'jsonwebtoken';

//Clée secrète pour la validation des tokens
const secret = process.env.JWT_SECRET || 'secret_code';

//middleware pour valider les tokens

export const authenticateToken = async (req, res, next)  => {

    try {
        console.log("Authorization Header:", req.headers.authorization);

        //Récupération du token de l'en-tête
        //On split la chaîne et on récupère la deuxième partie où se trouve le token
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token:", token);

        //S'il n'y a pas de otken à l'en-tête on renvoie une erreur
        if(!token) return res.status(401).json({ message: 'Token requis' });
        //On vérifie si le token est valide. s'il est valide on donne on donne les infos de l'utilisateur à la requêt
        //Pour que les routes aient accès à celui-ci.
        // Si le Token n'est pas valide on envoie une erreur avec le message l'indiquant

        jwt.verify(token, secret, (err, utilisateur) => {
            console.log(secret)

            //en cas d'erreur
            if(err){
                return res.status(401).json({ message: 'Token invalide ou expiré' });
            }

            req.utilisateur = utilisateur

            //passer à la prochaine étape
            next()
        })
    }
    catch(error) {
        console.error("Erreur serveur", error);
    }


}