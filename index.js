const inital = require("./config/initial"),
    algorithms = require("./algorithms"),
    tools = require("./algorithms/tools");


let main_table = inital();

console.table(main_table);

for (const name in algorithms) {
    let result = algorithms[name](tools.clone_2d_array(main_table), 0, 0, 4, 7);
    //result = algorithms[name](tools.clone_2d_array(result), 4, 7, 16, 16);

    console.log("\n", name, ":");
    console.table(result);
}
