const MAX_ID = (20 - 1) * 20 + (20 - 1);

module.export = {

    get_adjs: function (x, y) {
        let adjs = Array();
        let adj_id;

        adj_id = get_id(x, y + 1);
        if (adj_id != -1) adjs.push(adj_id);

        adj_id = get_id(x, y - 1);
        if (adj_id != -1) adjs.push(adj_id);

        adj_id = get_id(x + 1, y);
        if (adj_id != -1) adjs.push(adj_id);

        adj_id = get_id(x - 1, y);
        if (adj_id != -1) adjs.push(adj_id);

        return adjs;
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
    }

}