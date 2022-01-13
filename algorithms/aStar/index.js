const priority_queue = require("./priorityQueue"),
 tools = require("../tools"),
 home = require("../../config/home");

let START_X, START_Y, END_X, END_Y;

module.exports = (array, sx, sy, ex, ey) => {
    START_X = sx;
    START_Y = sy;
    END_X = ex;
    END_Y = ey;
    TARGET_ID = END_X * 20 + END_Y;

    let result = algorithm(array);
    let path = result.path;
    path.forEach((node_id) => {
        let xy = tools.get_xy(node_id);
        array[xy[0]][xy[1]] = home.type.tracked;
    });
    result.table = array;
    return result;
}

function algorithm(arr) {
    let frontier = new priority_queue((a, b) => a[1] < b[1]);
    let visited = new Set();
    let cur_path = [];
    let cur_id;
    let adjs_cells;
    let xy;
    let cur_depth;
    let extend_count = 0;
    let search_cost = 0;
    let extend_flag = false;

    frontier.push([[tools.get_id(START_X, START_Y)], h(START_X, START_Y)]);

    while (!frontier.isEmpty()) {
        cur_path = frontier.pop()[0];
        search_cost++;
        cur_depth = cur_path.length - 1;
        cur_id = cur_path[cur_depth];
        visited.add(cur_id);
        if (cur_id == TARGET_ID) {
            return {
                path: cur_path,
                node_number: extend_count,
                search_cost: search_cost,
                success: true,
            };
        }
        xy = tools.get_xy(cur_id);
        adjs_cells = tools.get_adjs(xy[0], xy[1]);
        extend_flag = false;
        for (let i = 0; i < adjs_cells.length; i++) {
            xy = tools.get_xy(adjs_cells[i]);
            if (!visited.has(adjs_cells[i]) && arr[xy[0]][xy[1]] !== home.type.wall && arr[xy[0]][xy[1]] !== home.type.hole) {
                extend_flag = true;
                new_path = cur_path.slice();
                new_path.push(adjs_cells[i]);
                frontier.push([new_path, cur_depth + h(xy[0], xy[1])]);
            }
        }
        if (extend_flag) extend_count++;
    }
    return {
        path: [],
        node_number: extend_count,
        search_cost: search_cost,
        success: false,
    };
}

function h(x, y) {
    return Math.abs(x - END_X) + Math.abs(y - END_Y);
}
