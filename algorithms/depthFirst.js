const tools = require("./tools"),
    home = require("../config/home");

let MIN = 999999,
    optimalPath = [];

module.exports = (table, sx, sy, ex, ey) => {

    // First initialization
    let visited = []
    for (let i = 0; i < 20; i++) {
        let temp = [];
        for (let j = 0; j < 20; j++)
            temp.push(false);
        visited.push(temp)
    }

    algorithm(table, sx, sy, ex, ey, visited, []);

    console.log(optimalPath);

    optimalPath.forEach((node_id) => {
        let xy = tools.get_xy(node_id);
        table[xy[0]][xy[1]] = home.type.tracked;
    });
    return table;
}

function algorithm(table, sx, sy, ex, ey, visited, path) {

    // If Indexes are Out of Bound then Return from Branch
    if (sx < 0 || sy < 0 || sx >= 20 || sy >= 20) return;

    path.push(tools.get_id(sx, sy));

    // Goal State Test
    if (sx == ex && sy == ey) {
        if (path.length <= MIN) {
            MIN = path.length;
            optimalPath = tools.clone_array(path);
            return;
        }
    }

    // Horizontal and Vertical Search
    if (sx - 1 >= 0 && !visited[sx - 1][sy] && table[sx - 1][sy] != home.type.wall) { // Up 
        visited[sx - 1][sy] = true;
        algorithm(table, sx - 1, sy, ex, ey, tools.clone_array(visited), tools.clone_array(path));
    } if (sx + 1 < 20 && !visited[sx + 1][sy] && table[sx + 1][sy] != home.type.wall) { // Down
        visited[sx + 1][sy] = true;
        algorithm(table, sx + 1, sy, ex, ey, tools.clone_array(visited), tools.clone_array(path));
    } if (sy - 1 >= 0 && !visited[sx][sy - 1] && table[sx][sy - 1] != home.type.wall) { // Left
        visited[sx][sy - 1] = true;
        algorithm(table, sx, sy - 1, ex, ey, tools.clone_array(visited), tools.clone_array(path));
    } if (sy + 1 < 20 && !visited[sx][sy + 1] && table[sx][sy + 1] != home.type.wall) { // Right
        visited[sx][sy + 1] = true;
        algorithm(table, sx, sy + 1, ex, ey, tools.clone_array(visited), tools.clone_array(path));
    }

}
