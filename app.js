
import express from 'express'; // Importation de express
import 'dotenv/config';//Importer pour utiliser les variables d'environnement
import cors from 'cors'; // Cors pour donner accès à tous les ports 
import utilisateurRouter from './routes/utilisateur.route.js';
import { sequelize } from './config/config.js'; // importer sequelize pour la syncrhonisation avec la base de données
import auteurRoute from './routes/auteur.route.js';
import livreRoute from './routes/livre.route.js';
// config();
const app = express();

//Toutes les méthodes sont accessibles à partir de toutes les origines
var corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200 
}

// Utiliser les variables d'environnement 


app.use(express.json());// Pour lire les coprs de requêtes en format JSON


app.use('/api/utilisateurs',cors(corsOptions), utilisateurRouter);
app.use('/api/auteurs',cors(corsOptions), auteurRoute);
app.use('/api/livres',cors(corsOptions), livreRoute);
app.use((err, req, res, next) => {
    console.error(err.stack); // Log de l'erreur pour le débogage
    res.status(500).send('Une erreur interne est survenue.');
});
const PORT = process.env.PORT || 3000;

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}. Accedez directement sur ...`)); // Démarrage du serveur 
  }); 

  export default app; //Exporter app pour les tests