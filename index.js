const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
require("dotenv").config();

//---------List of characters : page Characters-------------//

app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query); //http://localhost:3000/characters?name=spider&limit=20&skip=1&apikey=FC2wFuC9up0LG1Cr
    //==>  {apikey: 'FC2wFuC9up0LG1Cr' name: 'spider', limit: '20', skip: '1', apikey: 'FC2wFuC9up0LG1Cr' }

    // pagination

    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      //ajout des querys pour la barre de recherche : &nomDeLaQuery${req.query.nomDeLaQuery}
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );

    //console.log(response.data); // OK
    return res.json(response.data.results); // renvoie un [] de tous les {infos du héro}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//---------List of comics : comics page---------------//

app.get("/comics", async (req, res) => {
  try {
    //console.log(req.query); // { apikey: 'FC2wFuC9up0LG1Cr', title: 'spider', limit: '20', skip: '0' }

    // pagination

    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    //
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    //console.log(response.data); // OK
    return res.json(response.data.results); // renvoie un [] de {infos de la bd}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//---------List of comics containing a specific character-----//

app.get("/comics/:characterId", async (req, res) => {
  //console.log(req.params);
  const { characterId } = req.params;
  //console.log(characterId); //ID du personnage
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//----------infos of a specific character : character page----------//

/* // création d'un route en fonction de l'id
app.get("/character/:characterId", async (req, res) => {
  // Récupérer l'ID depuis les paramètres de l'URL
  const { characterId } = req.params;
  //console.log(characterId); OK
  //console.log(process.env.API_KEY); OK
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
    );
    return res.json(response.data); // Renvoie {} données
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); */

//--------Si je suis en dehors des routes définies----//

app.all("*", (req, res) => {
  return res.status(404).json("not found");
});

//------Démarrage serveur-------//

app.listen(process.env.PORT, () => {
  console.log("server started on port : " + process.env.PORT);
});
