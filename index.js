const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

//---------List of characters : home page-------------//

app.get("/characters", async (req, res) => {
  try {
    // récupération de tous les caratères via l'url de l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=FC2wFuC9up0LG1Cr"
    );
    //console.log(response.data.results); // OK
    return res.json(response.data.results); // renvoie un [] de {infos du héro}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//----------infos of a specific character : character page----------//

app.get("/character/:characterId", async (req, res) => {
  try {
    // récupération de tous les caratères via l'url de l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=FC2wFuC9up0LG1Cr"
    );
    //console.log(response.data.results); // OK
    return res.json(response.data.results); // renvoie {infos du héro}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//---------List of comics containing a specific character-----//

app.get("/comics/:characterId", async (req, res) => {
  try {
    // récupération de tous les caratères via l'url de l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=FC2wFuC9up0LG1Cr"
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
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=FC2wFuC9up0LG1Cr"
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
