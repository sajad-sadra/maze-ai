const priority_queue = require("./priorityQueue"),
 tools = require("../tools"),
 home = require("../../config/home");

let START_X, START_Y, END_X, END_Y, SEARCH_COST = 0, EXTEND_COUNT = 0;

module.exports = (table, sx, sy, ex, ey) => {
    START_X = sx;
    START_Y = sy;
    END_X = ex;
    END_Y = ey;
    TARGET_ID = END_X * 20 + END_Y;

    return {
        result_table: tools.set_path_to_table(table, algorithm(table)),
        search_cost: SEARCH_COST,
        extend_count: EXTEND_COUNT
    }
}

function algorithm(table) {
    let frontier = new priority_queue((a, b) => a[1] < b[1]);
    let visited = new Set();
    let path = [];
    let cur_id;
    let adjs_cells;
    let xy;
    let cur_depth;

    frontier.push([[tools.get_id(START_X, START_Y)], h(START_X, START_Y)]);

    while (!frontier.isEmpty()) {
        path = frontier.pop()[0];
        SEARCH_COST++;
        cur_depth = path.length - 1;
        cur_id = path[cur_depth];
        visited.add(cur_id);
        if (cur_id == TARGET_ID) {
            return path;
        }
        xy = tools.get_xy(cur_id);
        adjs_cells = tools.get_neighbours(xy[0], xy[1]);
        extend_flag = false;
        for (let i = 0; i < adjs_cells.length; i++) {
            xy = tools.get_xy(adjs_cells[i]);
            if (!visited.has(adjs_cells[i]) && table[xy[0]][xy[1]] != home.type.wall) {
                extend_flag = true;
                new_path = path.slice();
                new_path.push(adjs_cells[i]);
                frontier.push([new_path, cur_depth + h(xy[0], xy[1])]);
            }
        }
        if (extend_flag) EXTEND_COUNT++;
    }
    return [];
}

function h(x, y) {
    return Math.abs(x - END_X) + Math.abs(y - END_Y);
}
