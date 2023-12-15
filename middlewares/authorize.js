
//Exporter le middle authorize pour l'autorisation des routes selon le rôle de l'utilisateur
export function authorize(roles = []) {

    //Si role est un string, on transforme roles en tableau de strings
    if (typeof roles === "string") {
        roles = [roles]
    }

    // fonction qui sera retournée
    return (req, res, next) => {

        // Récupère l'utilisateur dans la requête
        const utilisateur = req.utilisateur;

        console.log(`role utilisateur ligne 16 ${utilisateur.role}`)
        //Vérifie si le rôle de l'utilisateur fourni le permet de de faire l'action. 
        //Si ce n'est pas le cas  ou bien l'utilisateur on renvoie une erreur

        if(!utilisateur || (roles.length && !roles.includes(utilisateur.role))) {
            
            return res.status(403).json({ message: 'Accès interdit' });
        }

        //Si l'utilisateur a le bon rôle  on passe
        next();
    }
}