
import request from 'supertest'; 
import app from '../web projet final/app.js'; 

//Token utilisé pour le test(déjà expriré au moment de la correction)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BoLmNvbSIsImlkIjoyLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwNjk2NTEsImV4cCI6MTcwMjA3MDU1MX0.55wFAho_Ki6SDUkzTNWsfA6jwLEz_uipq0MOC-jwZZA" 


// Test POST et GET pour livres
describe('POST /api/livres', () => {
  // Test pour POST
  it('Doit créer un nouveau livre', async () => {
    const res = await request(app)
      .post('/api/livres')
      .set('Authorization', `Bearer ${token}`)//Token pour le test
      .send({
        //Attributs du livre
        titre: 'livre 200', 
        auteurId: 1 ,
        annee: 1900,
        genre : "roman"
      });

    expect(res.statusCode).toEqual(201);// Code 201 est attendu
    // Vérifier que dans le corps il y bien un id ce qui confirme la création d'un nouveau livre
    expect(res.body).toHaveProperty('id'); 
  });
});


//TEST get
describe('GET /api/livres', () => {
  //GET par id
  it('Doit prendre un livre par son id', async () => {
    const res = await request(app)
      .get('/api/livres/1') //1 est le id d'un livre
    expect(res.statusCode).toEqual(200);// Code 200 est attendu
    expect(res.body).toHaveProperty('titre'); // Vérifier que dans le corps il y bien un titre ce qui confirme qu'un livre est retourné
  });
});

describe('GET /api/livres', () => {
    //GET tous les livres
    it('Doit prendre tous les livres', async () => {
      const res = await request(app)
        .get('/api/livres/') 
      expect(res.statusCode).toEqual(200);// Code 200 est attendu
    //   expect(res.body).toHaveProperty('titre'); // Vérifier que dans le corps il y bien un titre ce qui confirme qu'au moins un livre est retourné
    });
  });