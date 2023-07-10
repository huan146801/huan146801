// Làm bài
function getRandNumbers(min,max,length) {
    var arr = [];
    for(var i=1; i<=length; i++){
        arr.push(Math.random()* (max-min)+min);
    }
    return arr
}
console.log(getRandNumbers(1,100,8))