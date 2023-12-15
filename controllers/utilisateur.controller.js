import bcrypt from "bcrypt" //pour hasher les mots de passes
import jwt from "jsonwebtoken"
import Utilisateur from "../model/utilisateur.model.js"

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; //Code secret dans les variables d'environnement 

export const enregistrerUtilisateur = async (req, res) => {
    try {

        //Récupère le courriel et mot de passe par le corps de la requête
        const {email, motDePasse, role} = req.body

        //Le rôle n'est pas utilisateur de base.
        // pour manipuler les données plus facilement sans avoir recours à la création d'un admin directement dans la base de données, nous choisissons le rôle

        //Hacher le motDePAsse
        const motDePAsseHache = await bcrypt.hash(motDePasse, 8)//Min 8 caractères

        //Création du nouvel utilisateur
        const nvUtilisateur = await Utilisateur.create({
            email,
            motDePasse: motDePAsseHache,
            role
        })
        // Réponse avec statut 201  et les informations du nouvel 'utilisateur'
    res.status(201).json(nvUtilisateur);

    } 
    catch (error) {
    console.error(error);
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
}

//Fonction pour le login 

export const loginUtilisateur = async (req, res) => {
    try {
        // Récupération des données par le corps de la requête
        const {email, motDePasse} = req.body

        const utilisateur = await Utilisateur.findOne({where : { email }})

        console.log(`${utilisateur}`)
        // Si le courriel n'est pas valide/trouvé
        if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      const mdpCorrect  = await bcrypt.compare(motDePasse, utilisateur.motDePasse)
      console.log(`${mdpCorrect}`)
      //Erreur envoyé si le mot de passe n'est pas correct
      if(!mdpCorrect){
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }

      console.log(`${mdpCorrect}`)
       // Création d'un token si les infos fournis par la requête sont bonnes
    const token = jwt.sign({ email: utilisateur.email, id: utilisateur.id, role: utilisateur.role }, secret, { expiresIn: '15min' });
    console.log(`${token}`)
    res.cookie('token', token, { httpOnly: true });
        
    res.status(200).json({result :utilisateur, token})
    } catch (error) {
      console.error(error);
        //Réponse d'erreur si la connexion ne fonctionne pas
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
}

// PUT(update) utilisateur
export const updateUtilisateur = async (req, res) => {
    // Récupérer l'ID par les paramètres de requête
    const { id } = req.params;
  
    //récupérer le mot de passe et le role à modifier 
    const { motDePasse, role } = req.body;
  
    try {
      // Rechercher l'utilisateur par id
      const utilisateur = await Utilisateur.findByPk(id);
  
      //Pour déboggage

      // console.log(`${utilisateur.email}`)
      // console.log(`mot de passe avant${utilisateur.motDePasse}`)


      //Renvoie une erreur si l'utilisateur n'est pas trouvé
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Hachage du nouveau mot de passe s'il est founi, sinon on garde l'ancien
      const motDePAsseHache = motDePasse ? await bcrypt.hash(motDePasse, 8) : utilisateur.motDePasse;
  

      // Pour le déboggage
      console.log(`passe hashed ${await bcrypt.hash(motDePasse, 8)} fin`)
      console.log(`passe apres ${utilisateur.motDePasse}`)


      // Mettre les données de l'utilisateur à jour
      const utilisateurAJour = await utilisateur.update({ motDePasse: motDePAsseHache, role });
  
      // Créér un nouveau token pour l'utilisateur
      const token = jwt.sign({ email: utilisateurAJour.email, id: utilisateurAJour.id, role: utilisateurAJour.role }, secret, { expiresIn: '1h' });
  
      // Envoyer les données de l'utilisateur à jour.
      res.status(200).json({ result: utilisateurAJour, token });
    } catch (error) {
      // Envoie une erreur si ça ne marche pas
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
    }
  };

// Suppression d'un utilisateur
export const deleteUtilisateur = async (req, res) => {
    // Récupérer l'id de l'utilisateur par les paramètres de requête
    const { id } = req.params;
  
    try {
      // Rechercher un utilisteur pour l'id reçu
      const utilisateur = await Utilisateur.findByPk(id);
  
      // Si aucun utilisateur n'est trouvé par cet id, on envoie une erreur
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Supprimer
      await utilisateur.destroy();
  
      // Message pour dire que la suppression a fonctionné
      res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
      // Si ça ne marche pas, on envoie un message d'erreur
      res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
    }
  };