
import request from 'supertest'; 
import app from '../web projet final/app.js'; 

//Token utilisé pour le test(déjà expriré au moment de la correction)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BoLmNvbSIsImlkIjoyLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwNjk2NTEsImV4cCI6MTcwMjA3MDU1MX0.55wFAho_Ki6SDUkzTNWsfA6jwLEz_uipq0MOC-jwZZA" 


// Test POST et GET pour auteurs
describe('POST /api/auteurs', () => {
  // Test pour POST
  it('Doit créer un nouvel auteur', async () => {
    const res = await request(app)
      .post('/api/auteurs')
      .set('Authorization', `Bearer ${token}`)//Token pour le test
      .send({
        nom: 'auteur 3000', //nom de l'auteur
        biographie: "bla bla bla" // Biographie de l'auteur
      });

    expect(res.statusCode).toEqual(201);// Code 201 est attendu
    expect(res.body).toHaveProperty('id'); // Vérifier que dans le corps il y bien un id ce qui confirme la création d'un nouveal auteur
  });
});


//TEST get
describe('GET /api/auteurs', () => {
  //GET par id
  it('Doit prendre un auteur par son id', async () => {
    const res = await request(app)
      .get('/api/auteurs/1') //1 est le id d'un auteur
    expect(res.statusCode).toEqual(200);// Code 200 est attendu
    expect(res.body).toHaveProperty('nom'); // Vérifier que dans le corps il y bien un nom ce qui confirme qu'un auteur est retourné
  });
});

describe('GET /api/auteurs', () => {
    //GET tous les auteurs
    it('Doit prendre tous les auteurs', async () => {
      const res = await request(app)
        .get('/api/auteurs/') 
      expect(res.statusCode).toEqual(200);// Code 200 est attendu
      // expect(res.body).toHaveProperty('nom'); // Vérifier que dans le corps il y bien un nom ce qui confirme qu'au moins un auteur est retourné
    });
  });