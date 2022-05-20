const fs = require("fs");

module.exports = class Core {
  constructor() {
    this._pelouse;
    this._tondeuses = [];
  }

  run() {
    console.log("Yes, it is working")
  }
}