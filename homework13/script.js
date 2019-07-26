function Human() {
    this.type = 'human';
    this.legs = 2;
    this.hands = 2;
    this.brain = '0'
}
Human.constructor = Human;

Human.prototype.eat = function() {
    return 'Nyam-nyam'
}
Human.prototype.move = function() {
    return 'Walk'
}
function Educated() {
    Human.call(this);
    this.learning = '1+1=3';
    this.brain = 'ok'
}
Educated.prototype = Object.create(Human.prototype);
Educated.prototype.constructor = Educated;

Educated.prototype.sense = function() {
    return 'I"M need learning'
}
function Developer() {
    Educated.call(this);
    this.brain = 'MEGA'
}
Developer.prototype = Object.create(Educated.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.programming = function() {
    return '0101010101'
}

function GameDev() {
    Developer.call(this);
    this.language = 'C++, C#';
}
GameDev.prototype = Object.create(Developer.prototype);
GameDev.prototype.constructor = GameDev;

GameDev.prototype.job = function() {
    console.log('Create new GAMEs');
}
GameDev.prototype.programming = function() {
    return 'Console.WriteLine("Hello World!");'
}
function JS() {
    GameDev.call(this);
    this.language = 'Java Script';
}
GameDev.prototype.programming = function() {
    return 'console.log("Hello World!");'
}
JS.prototype.job = function() {
    return 'create ALL and fight wiht IE =)';
}
JS.prototype = Object.create(GameDev.prototype);
JS.prototype.constructor = JS;

var human = new Human(),
    educated = new Educated(),
    programmer = new Developer(),
    gameDev = new GameDev(),
    jsDev = new JS();


console.log(human,
            educated,
            programmer,
            gameDev,
            jsDev
            )