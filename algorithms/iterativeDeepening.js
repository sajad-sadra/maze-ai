const tools = require("./tools"),
    home = require("../config/home");

let START_X, START_Y, END_X, END_Y;


module.exports = (table, sx, sy, ex, ey) => {
    START_X = sx;
    START_Y = sy;
    END_X = ex;
    END_Y = ey;
    TARGET_ID = END_X * 20 + END_Y;

    return tools.set_path_to_table(table, algorithm(table).path);
}

function algorithm(table) {
    let depth = 0;
    let res;
    while (true) {
        res = DLS_algo(table, depth);
        if (res.cutoff === false) {
            return res;
        }
        depth++;
    }
}

function DLS_algo(table, depth_limit) {
    let visited = new Array(399 + 1);
    visited.fill(999999);
    let path = [];

    let cur_id;
    let xy;
    let adj_cell;
    let cur_depth;
    let cutoff_flag = false;

    path.push(tools.get_id(START_X, START_Y));
    while (path.length != 0) {
        cur_depth = path.length - 1;
        cur_id = path[cur_depth];
        if (visited[cur_id] < cur_depth) {
            path.pop();
            continue;
        }
        visited[cur_id] = cur_depth;
        if (cur_id == TARGET_ID) {
            return {
                path: path,
                cutoff: false,
            };
        }
        if (cur_depth === depth_limit) {
            cutoff_flag = true;
            path.pop();
            continue;
        }
        xy = tools.get_xy(cur_id);
        adj_cell = get_one_unvisited_adj(xy, cur_depth, visited, table);
        if (adj_cell == -1) {
            path.pop();
            continue;
        }
        path.push(adj_cell);
    }
    return [{
        path: [],
        cutoff: cutoff_flag,
    }];
}

function get_one_unvisited_adj(cur_xy, cur_depth, visited, table) {
    let adjs = tools.get_neighbours(cur_xy[0], cur_xy[1]);
    let child_id = -1;
    adjs.some((adj) => {
        let xy = tools.get_xy(adj);
        if (table[xy[0]][xy[1]] != home.type.wall && cur_depth + 1 < visited[adj]) {
            child_id = adj;
            return true;
        }
    });
    return child_id;
}
