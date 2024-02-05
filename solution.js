import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import countryNames from "./countryname.js";
import countryCodes from "./countrycode.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const POSTGRES_URL =
  "postgres://default:NxFpVY6S7LWs@ep-round-snowflake-46031602-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb";

const { Pool } = pg;

const db = new Pool({
  connectionString: POSTGRES_URL + "?sslmode=require",
});

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "asdf",
//   port: 5432,
// });

// "start": "node solution.js"
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

let currentUserId = 1;
let message = "";

let users;

async function checkVisisted() {
  const result = await db.query(
    "SELECT * FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  let countries = [];
  //console.log(result.rows);
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  //console.log(countries);
  return countries;
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  let user = result.rows;
  //console.log(user);
  return user.find((user) => user.id == currentUserId);
}
async function getallUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const allUsers = await getallUser();
  const currentUser = await getCurrentUser();

  //console.log(currentUser);

  if (currentUser === undefined) {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: allUsers,
      color: "",
      message: message,
    });
  } else {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: allUsers,
      color: currentUser.color ? currentUser.color : "grey",
      message: message,
    });
  }
  message = "";
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  //const currentUser = await getCurrentUser();

  try {
    const countryCode = countryNames[input.toLowerCase()];
    //console.log(countryCode);
    if (countryCode === undefined) {
      message = "Not a country";
      res.redirect("/");
      throw new Error("wrong spelling");
    }
    try {
      const codes = await checkVisisted();
      codes.forEach((cd) => {
        if (countryCode === cd) {
          throw new Error("Country already added");
        }
      });
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      message = "Country added";
      res.redirect("/");
    } catch (err) {
      message = "Country already added";
      console.log("country already added" + err);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// user account
app.post("/user", async (req, res) => {
  //console.log(req.body.user + req.body.add + req.body.edit);
  //console.log(req.body.edit);
  if (req.body.user) {
    console.log(req.body.user);
    currentUserId = req.body.user;
    res.redirect("/");
  }
  // } else {
  //   console.log("he" + req.body.edit);
  //   currentUserId = req.body.edit;
  //   const currentUser = await getCurrentUser();
  //   const countryCode = await checkVisisted();
  //   let userCountries = [];
  //   countryCode.forEach((code) => {
  //     // console.log(countryCodes[code]);
  //     // console.log(code);
  //     if (countryCodes[code]) {
  //       userCountries.push([countryCodes[code], code]);
  //     }
  //   });
  //   //console.log("current");
  //   console.log(currentUser);
  //   res.render("edit.ejs", {
  //     user: currentUser,
  //     listTitle: "Country",
  //     items: userCountries,
  //   });
  // }
});

//add new user
app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  if (!name || !color) {
    message = "add color";
    res.redirect("/");
  }
  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
      [name, color]
    );

    const id = result.rows[0].id;
    currentUserId = id;
    message = "Added a new user";
    focus;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    message = "Name already exist";
    res.redirect("/");
  }
});

// update user account
app.post("/update", async (req, res) => {
  //console.log(req.body.user + req.body.add + req.body.edit);

  const name = req.body.name;
  const ide = req.body.id;
  const color = req.body.color;
  //console.log(name + id + color);
  if (!name && !color) {
    message = "add name or add color";
    res.redirect("/user/account/" + ide);
  } else {
    try {
      if (name) {
        const results = await db.query(
          "UPDATE users SET name = ($1) WHERE id = ($2)",
          [name, ide]
        );
      }
      if (color) {
        const result = await db.query(
          "UPDATE users SET color = ($1) WHERE id = ($2)",
          [color, ide]
        );
      }

      currentUserId = ide;
      message = "Success";
      res.redirect("/user/account/" + ide);
    } catch (error) {
      console.log(error);
    }
  }
});

//delete account
app.post("/delete", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const result = await db.query(
      "DELETE FROM visited_countries WHERE ID = ($1)",
      [id]
    );
    const results = await db.query("DELETE FROM users WHERE ID = ($1)", [id]);
    currentUserId = 1;
    message = "Account deleted";
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
// list item
// app.get("/", (req, res) => {
//   res.render("index.ejs", {
//     listTitle: "Country",
//     listItems: items,
//   });
// });

app.post("/edit/country", async (req, res) => {
  const name = req.body.updatedItemTitle;
  const code = req.body.itemCode;
  //console.log(req.body.itemCode + name);

  if (countryNames[name]) {
    //console.log(countryNames[name]);
    const results = await db.query(
      "UPDATE visited_countries SET country_code = ($1) WHERE user_id = ($2) AND country_code = ($3)",
      [countryNames[name], currentUserId, code]
    );

    //const currentUser = users.find((user) => user.id == currentUserId);
    const currentUser = await getCurrentUser();
    const countryCode = await checkVisisted();
    let userCountries = [];
    countryCode.forEach((code) => {
      //console.log(countryCodes[code]);

      if (countryCodes[code]) {
        userCountries.push([countryCodes[code], code]);
      }
    });
    console.log("current");
    console.log(currentUser);
    message = "Country updated";
    res.redirect("/user/account/" + currentUserId);
  } else {
    message = "wrong spelling or already exist";
    res.redirect("/user/account/" + currentUserId);
    console.log("wrong spelling or already exist");
  }
});

app.post("/delete/country", async (req, res) => {
  const code = req.body.deleteItemId;
  try {
    const result = await db.query(
      "DELETE FROM visited_countries WHERE user_id = ($1) AND country_code = ($2)",
      [currentUserId, code]
    );
    //const currentUser = users.find((user) => user.id == currentUserId);
    const countryCode = await checkVisisted();
    let userCountries = [];
    countryCode.forEach((code) => {
      // console.log(countryCodes[code]);
      // console.log(code);
      if (countryCodes[code]) {
        userCountries.push([countryCodes[code], code]);
      }
    });
    // console.log("current");
    // console.log(currentUser);
    message = "Country deleted";
    res.redirect("/user/account/" + currentUserId);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/account/:id", async (req, res) => {
  console.log(req.params.id);
  currentUserId = req.params.id;
  const currentUser = await getCurrentUser();
  const countryCode = await checkVisisted();
  let userCountries = [];
  countryCode.forEach((code) => {
    // console.log(countryCodes[code]);
    // console.log(code);
    if (countryCodes[code]) {
      userCountries.push([countryCodes[code], code]);
    }
  });
  //console.log("current");
  console.log(currentUser);
  res.render("edit.ejs", {
    user: currentUser,
    listTitle: "Country",
    items: userCountries,
    message: message,
  });
  message = "";
});

app.get("/fullview/:id", async (req, res) => {
  currentUserId = req.params.id;

  const currentUser = await getCurrentUser();
  const countryCode = await checkVisisted();
  let userCountries = [];
  countryCode.forEach((code) => {
    // console.log(countryCodes[code]);
    // console.log(code);
    if (countryCodes[code]) {
      userCountries.push([countryCodes[code], code]);
    }
  });
  //console.log("current");
  console.log(currentUser);
  res.render("full.ejs", {
    user: currentUser,
    countries: countryCode,
    total: userCountries.length,
    color: currentUser.color ? currentUser.color : "grey",
  });
});

app.get("/add/newuser", async (req, res) => {
  res.render("new.ejs");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
