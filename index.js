const inital = require("./config/initial"),
    algorithms = require("./algorithms"),
    tools = require("./algorithms/tools");


let main_table = inital();

console.table(main_table);

for (const name in algorithms) {
    let result = algorithms[name](tools.clone_2d_array(main_table), 0, 0, 4, 7);

    let total_search_cost = result.search_cost;
    let total_extend_count = result.extend_count;


    //result = algorithms[name](tools.clone_2d_array(result.result_table), 4, 7, 16, 16);

    total_search_cost += result.search_cost;
    total_extend_count += result.extend_count;

    console.log("\n", name, ":");
    console.log("Search Cost:", total_search_cost, "\t", "Extended Node:", total_extend_count);
    console.table(result.result_table);
}
