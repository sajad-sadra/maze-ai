const inital = require("./config/initial"),
    algorithms = require("./algorithms"),
    tools = require("./algorithms/tools");


let main_table = inital();

console.table(main_table);

for (const name in algorithms) {
    let result1 = algorithms[name](tools.clone_2d_array(main_table), 0, 0, 4, 7);
    result2 = algorithms[name](tools.clone_2d_array(result1.result_table), 4, 7, 16, 16);

    console.log("\n", name, ":");
    console.log("Search Cost:", result1.search_cost + result2.search_cost, "\t", "Extended Node:", result1.extend_count + result2.extend_count)
    console.table(result2.result_table);
}
