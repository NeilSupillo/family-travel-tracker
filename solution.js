import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import countryNames from "./countryname.js";
import countryCodes from "./countrycode.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const POSTGRES_URL =
//   "postgres://default:NxFpVY6S7LWs@ep-round-snowflake-46031602-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb";

// const { Pool } = pg;

// const db = new Pool({
//   connectionString: POSTGRES_URL + "?sslmode=require",
// });

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "asdf",
  port: 5432,
});

// "start": "node solution.js"
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

let currentUserId = 1;

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
  return countries;
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  let user = result.rows;
  console.log(user);
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

  console.log(currentUser);

  if (currentUser === undefined) {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: allUsers,
      color: "",
    });
  } else {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: allUsers,
      color: currentUser.color,
    });
  }
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  //const currentUser = await getCurrentUser();

  try {
    const countryCode = countryNames[input.toLowerCase()];
    console.log(countryCode);
    if (countryCode === undefined) {
      throw new Error("wrong spelling");
    }
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log("country already added" + err);
    }
  } catch (err) {
    console.log("country name not found or " + err);
  }
});

// user account
app.post("/user", async (req, res) => {
  //console.log(req.body.user + req.body.add + req.body.edit);
  //console.log(req.body.edit);
  if (req.body.add === "add") {
    res.render("new.ejs");
  } else if (req.body.user) {
    currentUserId = req.body.user;
    res.redirect("/");
  } else {
    const currentUser = users.find((user) => user.id == req.body.edit);
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
    console.log(currentUser);
    res.render("edit.ejs", {
      user: currentUser,
      listTitle: "Country",
      items: userCountries,
    });
  }
});

//add new user
app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

// update user account
app.post("/update", async (req, res) => {
  //console.log(req.body.user + req.body.add + req.body.edit);

  const name = req.body.name;
  const ide = req.body.id;
  const color = req.body.color;
  //console.log(name + id + color);

  try {
    const results = await db.query(
      "UPDATE users SET name = ($1) WHERE id = ($2)",
      [name, ide]
    );
    const result = await db.query(
      "UPDATE users SET color = ($1) WHERE id = ($2)",
      [color, ide]
    );

    currentUserId = ide;

    res.redirect("/");
  } catch (error) {
    console.log(error);
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

    const currentUser = users.find((user) => user.id == currentUserId);
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
    res.render("edit.ejs", {
      user: currentUser,
      listTitle: "Country",
      items: userCountries,
    });
  } else {
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
    const currentUser = users.find((user) => user.id == currentUserId);
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
    res.render("edit.ejs", {
      user: currentUser,
      listTitle: "Country",
      items: userCountries,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
