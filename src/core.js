const fs = require("fs");

module.exports = new class Core {
  constructor() {
    this._max = [];
    this._nb_tondeuse;
    this._orientations = ['N', 'E', 'S', 'W'];
    this._orientation_add = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  }

  compute_path() {
    let content;
    try {
      content = fs.readFileSync(process.argv[2], { encoding: 'utf8' });
      let lines = content.split(/\r?\n/);
      let tondeuses;
      this._nb_tondeuse = lines.length;
      this._max = lines[0].split(" ");

      for (let i = 1; i < this._nb_tondeuse; i+=2) {
        tondeuses = lines[i].split(" ");
        let x = parseInt(tondeuses[0]);
        let y = parseInt(tondeuses[1]);
        let ori = tondeuses[2];
        let index_ori = this._orientations.findIndex(i => i === ori);

        for (let j = 0; j < lines[i + 1].length; j++) {
          if (lines[i+1][j] == "G") {
            if (index_ori == 0)
              index_ori = 4;
            index_ori -= 1;
          } else if (lines[i+1][j] == "D") {
            if (index_ori == 3)
              index_ori = -1;
            index_ori += 1;
          } else {
            let x_add = this._orientation_add[index_ori][0];
            let y_add = this._orientation_add[index_ori][1];
            if ((x == 0 && x_add < 0) || (x == parseInt(this._max[0]) && x_add > 0))
              continue;
            if ((y == 0 && y_add < 0) || (y == parseInt(this._max[1]) && y_add > 0))
              continue;
            x += x_add;
            y += y_add;
          }
        }
        console.log(`${x} ${y} ${ori}`);
      }

    } catch(err) {
      console.error(err);
    }
  }
}