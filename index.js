const inital = require("./config/initial"),
    algorithm = require("./algorithms");


let main_table = inital.make_primary_table();

let result = algorithm[process.env.ALGO](main_table, 0, 0, 4, 7);
result = algorithm[process.env.ALGO](result.table, 4, 7, 16, 16);



// Print Result
console.log(result.success ? "😊SUCCEED😊" : "😞FAILED😞");
console.table(inital.reset_start_and_fruit(result.table));