const tools = require("./tools"),
    home = require("../config/home");

let MIN = 999999,
    optimalPath = [],
    TABLE = [];

module.exports = (table, sx, sy, ex, ey) => {
    TABLE = tools.clone_2d_array(table);

    return tools.set_path_to_table(table, algorithm(TABLE, sx, sy, ex, ey));
}

function algorithm(sx, sy, ex, ey, path) {

    if (sx < 0 || sx >= 20) return null;
    if (sy < 0 || sy >= 20) return null;

    if (sx === ex && sy === ey) return path;
    if (TABLE[sx][sy] === home.type.wall) return null;

    TABLE[sx][sy] = home.type.wall;
    path.push(tools.get_id(sx, sy));

    let res = (algorithm(sx + 1, sy, ex, ey, path)
        || algorithm(sx, sy + 1, ex, ey, path)
        || algorithm(sx - 1, sy, ex, ey, path)
        || algorithm(sx, sy - 1, ex, ey, path));

    if (res != null) return res;

    TABLE[sx][sy] = home.type.open;
    path.pop();

    return null;
}
