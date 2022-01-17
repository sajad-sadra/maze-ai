const tools = require("./tools"),
    home = require("../config/home");

module.exports = (table, sx, sy, ex, ey) => {
    let path = algorithm(tools.clone_2d_array(table), sx, sy, ex, ey);
    path.forEach((node_id) => {
        let xy = tools.get_xy(node_id);
        table[xy[0]][xy[1]] = home.type.tracked;
    });
    return table;
}


function algorithm(table, sx, sy, ex, ey) {
    let frontier = [[sx, sy, 0, []]];
    let res = [];
    while (frontier.length > 0 && table[ex][ey] === home.type.fruit) {
        frontier = flood(table, frontier);
        for (const element of frontier) {
            if (element[0] === ex && element[1] === ey)
                res.push({
                    cost: element[2],
                    path: [...element[3], tools.get_id(ex, ey)]
                });
        }
    }

    // Find minimum path per cost
    let final_path = [];
    let min = 9999999;
    res.forEach(r => {
        if (r.cost < min) {
            min = r.cost;
            final_path = r.path;
        }
    })
    return final_path;
}


const dirs = {
    up: (x, y, cost, path) => [x, y - 1, cost + 1, [...path, tools.get_id(x, y)]],
    down: (x, y, cost, path) => [x, y + 1, cost + 1, [...path, tools.get_id(x, y)]],
    left: (x, y, cost, path) => [x - 1, y, cost + 1, [...path, tools.get_id(x, y)]],
    right: (x, y, cost, path) => [x + 1, y, cost + 1, [...path, tools.get_id(x, y)]]
}

function valid(table, x, y) {
    if (x >= 0 && x < 20 && y >= 0 && y < 20)
        return (table[x][y] != home.type.wall)
    else
        return false;
}

function adjacent(table, frontier) {
    let adjs = []
    for (const element of frontier) {
        for (const d in dirs) {
            let neighbour = dirs[d](...element);
            if (valid(table, neighbour[0], neighbour[1])) {
                adjs.push([...neighbour]);
            }
        }
    }
    return adjs;
}

function flood(table, frontier) {
    let res = adjacent(table, frontier)
    for (const element of frontier)
        table[element[0]][element[1]] = home.type.wall;
    return res;
}
