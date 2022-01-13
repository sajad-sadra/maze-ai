const inital = require("./config/initial"),
    algorithms = require("./algorithms");


let main_table = inital();

console.table(main_table);

for (const name in algorithms){
    console.log("\n", name, ":");
    let result = algorithms[name](main_table, 0, 0, 4, 7);
    result = algorithms[name](result, 4, 7, 16, 16);
    console.table(result);
}
