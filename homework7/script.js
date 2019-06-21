function exchange(from, to){
    var object = {usd: 26.5, euro: 30, uah: 1}; 
    for (var key in object) {
        if (key === from) {
            fromValue = object[key];}
        if (key === to) {
            toValue = object[key];} 
    }return (object[from]/object[to]);
}
var from = 'usd',
      to = 'euro';
var input = 500 , 
    output  = (input * exchange(from, to)).toFixed(2);
 console.log(input + ' ' + from +' = ' + output + ' ' + to);


function deposit(sum , rate , years){
    for (var index = years; index > 0; index--) {
        sum += (sum * rate /100);
    }
    return sum.toFixed(2)
}
console.log(deposit(10000, 12, 15));
