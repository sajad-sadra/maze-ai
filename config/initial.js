const home = require("./home");

function Random(n) {
    return Math.floor(Math.random() * 1000) % n;
}

function empty_table(){
    let arr = [];
    
    // Initialize all of home
    for (let i = 0; i < 20; i++) {
        arr[i] = [];
        for (let j = 0; j < 20; j++) {
            arr[i][j] = home.type.open;
        }
    }

    return arr;
}

function set_start_and_fruit(arr){
    arr[0][0] = home.type.start; 
    arr[4][7] = home.type.fruit;
    arr[16][16] = home.type.fruit;
    return arr;
}

function set_obstacle(count, character, array){
    for (let i = 0; i < count; i++){
        let x = Random(20), y = Random(20);
        if (array[x][y] === home.type.open)
            array[x][y] = character;
    }
    return array;
}

module.exports = () => {
    let table = empty_table();
    table = set_start_and_fruit(table);
    table = set_obstacle(60, home.type.wall, table);
    return table;
}