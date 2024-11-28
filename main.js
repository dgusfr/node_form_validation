var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var validator = require("validator");

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cookie-parser é um middleware usado para analisar os cookies anexados, implementando autenticação, gerenciamento de sessões
app.use(cookieParser("jsaddsh"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  var emailError = req.flash("emailError");
  var pontosError = req.flash("pontosError");
  var nomeError = req.flash("nomeError");
  var email = req.flash("email");

  //requisição flash no emailError
  if (emailError == undefined || emailError.length == 0) {
    emailError = undefined;
  } else {
    emailError = emailError;
  }

  if (email == undefined || email.length == 0) {
    email = "";
  } else {
    email = email;
  }

  //retorna o email informado no campo em questão
  res.render("index", { emailError, pontosError, nomeError, email: email });
});

app.post("/form", (req, res) => {
  var { email, nome, pontos } = req.body;

  var emailError;
  var pontosError;
  var nomeError;

  //Sem o validator:
  //   if (email == undefined || email == "") {
  //     emailError = "O e-mail não pode ser vazio";
  //   }

  //Com a biblioteca validator:
  if (!validator.isEmail(email)) {
    emailError = "E-mail inválido";
  }

  if (pontos == undefined || pontos < 20) {
    pontosError = "Você não pode ter menos de 20 ponto";
  }

  if (nome == undefined || nome == "") {
    nomeError = "O nome não pode ser vazio";
  }

  if (nome.length < 4) {
    nomeError = "O nome é mt pequeno";
  }

  if (
    emailError != undefined ||
    pontosError != undefined ||
    nomeError != undefined
  ) {
    req.flash("emailError", emailError);
    req.flash("pontosError", pontosError);
    req.flash("nomeError", nomeError);

    req.flash("email", email);

    res.redirect("/");
  } else {
    res.send("Formulário enviado!");
  }
});

app.listen(3000, (req, res) => {
  console.log("Servidor rodando na porta 3000!");
});
