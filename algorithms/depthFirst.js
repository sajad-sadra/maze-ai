const tools = require("./tools"),
    home = require("../config/home");

let MIN = 999999,
    optimalPath = [],
    matrix = [],
    SEARCH_COST = 0, EXTEND_COUNT = 0;

module.exports = (table, sx, sy, ex, ey) => {
    TABLE = tools.clone_2d_array(table);
    return {
        result_table: tools.set_path_to_table(table, algorithm(table, sx, sy, ex, ey)),
        search_cost: SEARCH_COST,
        extend_count: EXTEND_COUNT
    }
}

function algorithm(table, sx, sy, ex, ey) {
    matrix = tools.clone_2d_array(table);
    let result = findWay([sx, sy], [ex, ey]);
    result.push([ex, ey]);
    //console.log(result);
    let path = [];
    result.forEach(i => path.push(tools.get_id(i[0], i[1])));
    return path;
}


function findWay(pos, end, way) {
    if (way === undefined) way = [];

    if (pos[0] < 0 || pos[0] >= matrix.length) return null;
    if (pos[1] < 0 || pos[1] >= matrix[0].length) return null;

    if (pos[0] == end[0] && pos[1] == end[1]) return way;
    if (matrix[pos[0]][pos[1]] === home.type.wall) return null;

    const current_state = matrix[pos[0]][pos[1]];
    matrix[pos[0]][pos[1]] = home.type.wall;
    way.push(pos);

    let res = (findWay([pos[0] + 1, pos[1]], end, way)
        || findWay([pos[0], pos[1] + 1], end, way)
        || findWay([pos[0] - 1, pos[1]], end, way)
        || findWay([pos[0], pos[1] - 1], end, way));

    if (res !== null) return res;

    matrix[pos[0]][pos[1]] = current_state;
    way.pop();

    return null;
}