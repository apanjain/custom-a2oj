// import codeforces_api
const express = require("express");
const router = express.Router();
const axios = require("axios");

const {
  div_a,
  div_b,
  div_c,
  div_d,
  div_e,
  div_1d,
  div_1e,
  rating_1,
  rating_2,
  rating_3,
  rating_4,
  rating_5,
  rating_6,
  rating_7,
  rating_8,
  rating_9,
  rating_10,
  rating_11,
} = require("../utils/ladder");

//Register
router.get("/", async (req, res, next) => {
  let handle, div, rating;
  try {
    handle = req.query.handle;
    div = req.query.div;
    rating = req.query.rating;
    if (!handle || !div || !rating) {
      res.render("index", { msg: null });
      return next();
    }
  } catch {
    res.render("index", { msg: null });
    return next();
  }
  let submissions = { result: [] };
  try {
    let res = await axios.get(
      `https://codeforces.com/api/user.status/?handle=${handle}`
    );
    submissions = res.data;
    console.log(submissions.result.length);
  } catch (err) {
    console.log(err);
    res.render("index", { msg: "Invalid Codeforces Handle" });
    return next();
  }
  let ladder = [];
  let division = [];
  div = parseInt(div);
  rating = parseInt(rating);
  console.log({ handle, div, rating });
  let div_head = "";
  if (div === 1) {
    division = div_a;
    div_head = "DIV 2.A";
  } else if (div === 2) {
    division = div_b;
    div_head = "DIV 2.B";
  } else if (div === 3) {
    division = div_c;
    div_head = "DIV 2.C";
  } else if (div === 4) {
    division = div_d;
    div_head = "DIV 2.D";
  } else if (div === 5) {
    division = div_e;
    div_head = "DIV 2.E";
  } else if (div === 6) {
    division = div_1d;
    div_head = "DIV 1.D";
  } else if (div === 7) {
    division = div_1e;
    div_head = "DIV 1.E";
  } else if (rating === 1) {
    division = rating_1;
    div_head = "Codeforces Rating < 1300";
  } else if (rating === 2) {
    division = rating_2;
    div_head = "1300 <= Codeforces Rating <= 1399";
  } else if (rating === 3) {
    division = rating_3;
    div_head = "1400 <= Codeforces Rating <= 1499";
  } else if (rating === 4) {
    division = rating_4;
    div_head = "1500 <= Codeforces Rating <= 1599";
  } else if (rating === 5) {
    division = rating_5;
    div_head = "1600 <= Codeforces Rating <= 1699";
  } else if (rating === 6) {
    division = rating_6;
    div_head = "1700 <= Codeforces Rating <= 1799";
  } else if (rating === 7) {
    division = rating_7;
    div_head = "1800 <= Codeforces Rating <= 1899";
  } else if (rating === 8) {
    division = rating_8;
    div_head = "1900 <= Codeforces Rating <= 1999";
  } else if (rating === 9) {
    division = rating_9;
    div_head = "2000 <= Codeforces Rating <= 2099";
  } else if (rating === 10) {
    division = rating_10;
    div_head = "2100 <= Codeforces Rating <= 2199";
  } else if (rating === 11) {
    division = rating_11;
    div_head = "Codeforces Rating >= 2200";
  } else {
    res.render("index", { msg: "Invalid Division selected " });
  }
  let solved = 0;
  division.forEach((step) => {
    let found = submissions.result.some((sub) => {
      try {
        if (
          parseInt(step[2]) === sub.problem.contestId &&
          step[3] === sub.problem.index &&
          sub.verdict === "OK"
        ) {
          solved = solved + 1;
          return true;
        }
      } catch {}
    });
    ladder.push([step[0], step[1], step[2], step[3], found]);
  });
  try {
    // logging.basicConfig((filename = "handle.log"), (level = logging.INFO));
    // logging.info(handle);
    console.log(handle);
  } catch {
    console.log("Error in logging");
  }
  res.render("ladder", { ladder, handle, division: div_head, rating, solved });
  return next();
});

module.exports = router;
