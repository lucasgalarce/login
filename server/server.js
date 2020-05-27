const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs"); // fs = FILE SYSTEM

const app = express();

// Middleware para rutas a recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));


app.use(bodyParser.json());

let userList = [
  {
    username: "admin",
    password: "admin"
  }
];

// GET de página inicial
app.get("/", (req, res) => {
  // Retorna página inicial
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// GET de página de registro
app.get("/register-page", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

// GET de página de registro
app.get("/home", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/home.html"));
});


// POST /register - Registrar usuarix
app.post("/register", (req, res) => {
  console.log(req.body); // { username: 'admin', password: 'admin' }

  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password) {
    res.status(400).send("No se recibieron los datos correctos.");
    return;
  }
  //Valido que la contraseña y la confirmacion de contraseña sean iguales
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send("No coinciden las contraseñas.");
    return;
  }

  // Tengo los dos datos, los valido

  // Valido si existe el nombre de usuarix
  if (userList.filter(user => user.username === req.body.username).length > 0) {
    res.status(409).send("Ya existe usuarix con ese nombre.");
    return;
  }

  userList.push({
    username: req.body.username,
    password: req.body.password
  });

  console.log(userList);

  res.status(200).send("Usuarix registradx.");

});

// POST /login - login de usuarix
app.post("/login", (req, res) => {

  console.log(req.body);

  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password) {
    res.status(400).send("No se recibieron los datos correctos.");
    return;
  }

  if (userList.filter(user => user.username === req.body.username && user.password === req.body.password).length > 0) {
    res.status(200).send();
  } else {
    res.status(403).send("Datos incorrectos.");
  }

});

app.get("/phrases", (req, res) => {

  getPhrasesList(function (phrasesList) {
    if (req.query.keyword) {
      res.json(phrasesList.filter(phrases => phrases.includes(req.query.keyword)).slice(0, 5));
    } else {
      res.json(phrasesList.slice(0, 5))
    }
  });

});

app.listen(4000, () => {
  console.log("Server iniciado en puerto 4000...")
});

function getPhrasesList(resultCallback) {

  fs.readFile(path.join(__dirname, "phrases.json"), "utf8", (err, data) => {

    if (err) {
      console.log("No se pudo leer el archivo.");
      resultCallback([]);
    } else {
      resultCallback(JSON.parse(data));
    }
  });

}