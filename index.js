const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
require("dotenv").config();

//---------List of characters : page Characters-------------//

app.get("/characters", async (req, res) => {
  try {
    // récupération de tous les charaters via l'url de l'API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    //console.log(response.data.results); // OK
    return res.json(response.data.results); // renvoie un [] de {infos du héro}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//----------infos of a specific character : character page----------//

// création d'un route en fonction de l'id
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
});

//---------List of comics containing a specific character-----//

app.get("/comics/:comicId", async (req, res) => {
  const { comicId } = req.params;
  try {
    // récupération de tous les caratères via l'url de l'API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${comicId}=${process.env.API_KEY}`
    );
    //console.log(response.data.results); // OK
    return res.json(response.data.results); // renvoie un [] d' {comics} du Héro
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//---------List of comics : comics page---------------//

app.get("/comics", async (req, res) => {
  try {
    // récupération de tous les caratères via l'url de l'API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    //console.log(response.data); // OK
    return res.json(response.data.results); // renvoie un [] de {infos de la bd}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//--------Si je suis en dehors des routes définies----//

app.all("*", (req, res) => {
  return res.status(404).json("not found");
});

//------Démarrage serveur-------//

app.listen(3000),
  () => {
    console.log("serveur started");
  };
