const home = require("../config/home");

module.exports = {

    get_neighbours: function (x, y) {
        let neighbours = Array();
        let neighbour_id;

        neighbour_id = this.get_id(x, y + 1);
        if (neighbour_id != -1) neighbours.push(neighbour_id);

        neighbour_id = this.get_id(x, y - 1);
        if (neighbour_id != -1) neighbours.push(neighbour_id);

        neighbour_id = this.get_id(x + 1, y);
        if (neighbour_id != -1) neighbours.push(neighbour_id);

        neighbour_id = this.get_id(x - 1, y);
        if (neighbour_id != -1) neighbours.push(neighbour_id);

        return neighbours;
    },

    get_id: function (x, y) {
        if (x >= 20 || y >= 20 || x < 0 || y < 0) return -1;
        return x * 20 + y;
    },

    get_xy: function (id) {
        return [Math.floor(id / 20), id % 20];
    },

    getRandomIntInclusive: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    get_xy_path: function (p) {
        let res_xy = [];
        p.forEach((element) => {
            res_xy.push(get_xy(element));
        });
        return res_xy;
    },

    clone_2d_array: function (array) {
        let result = [];
        array.forEach(element => {
            let temp = [];
            element.forEach(home => {
                temp.push(home);
            })
            result.push(temp);
        });
        return result;
    },

    clone_array: function (array) {
        let temp = [];
        array.forEach(e => temp.push(e));
        return temp;
    },

    set_path_to_table: function(table, path){
        path.forEach((node_id) => {
            let xy = this.get_xy(node_id);
            table[xy[0]][xy[1]] = home.type.tracked;
        }); 
        return table;
    }
}