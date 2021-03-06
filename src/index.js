#!/usr/bin/env node
"use strict";
const lastNameDB = require("./last-names.db.json");
const namesDB = require("./names.db.json");
const argv = require("minimist")(process.argv.slice(2));

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

if (argv.h) {
  console.log("https://github.com/ariassd/easy-namedb");
  return;
}

let namesSearchList = namesDB.items;
let lastNamesSearchList = lastNameDB.items;
if (argv.nl) {
  argv.nl = argv.nl.replace(/_/g, " ");
  namesSearchList = namesSearchList.filter((i) =>
    i.value.toLowerCase().startsWith(argv.nl[0]?.toLowerCase().trim() || "")
  );
  lastNamesSearchList = lastNamesSearchList.filter((i) =>
    i.value.toLowerCase().startsWith(argv.nl[1]?.toLowerCase().trim() || "")
  );
}

const name =
  namesSearchList[randomIntFromInterval(0, namesSearchList.length - 1)];
const lastName =
  lastNamesSearchList[randomIntFromInterval(0, lastNamesSearchList.length - 1)];
// Mr /Mister/ ( married man ), Mrs /Missus/ ( Married Woman )
// Miss /Miss/  ( No married woman ), Ms /Mizz/ ( Don't tell if is married or not)
const title = name.gender === "boy" ? "Mr" : "Ms";
console.log(`${title} ${name.value} ${lastName.value}`);
