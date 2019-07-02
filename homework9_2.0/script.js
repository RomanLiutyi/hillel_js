function MilitaryResource(type, health, distance) {
    this.type = type;
    this.health = health;
    this.maxHealth = 5000;
    this.minHealth = 0;
    this.distance = distance;
    this.minDistance = 0;
    this.maxDistance = 5000;    
}
MilitaryResource.prototype.isReadyToMove = function (){
	return this.distance < this.maxDistance;
}
MilitaryResource.prototype.isReadyToFight = function (){
	return this.health > this.minHealth;
}
MilitaryResource.prototype.restore = function (){
	return this.health = this.maxHealth, this.distance = this.minDistance;
}
MilitaryResource.prototype.clone = function(){
	return new MilitaryResource(this.type, this.health, this.distance);
}
function Squad(defaultResource){
    defaultResource ? this.squad = defaultResource : []
}
var resource = [
    new MilitaryResource('air', 500, 0),
    new MilitaryResource('wather', 1000, 0),
    new MilitaryResource('air2', 0, 0),
    new MilitaryResource('wather2', 15500, 55550)
]
Squad.prototype.restore = function(){
    return this.squad.every(function(item){return item.restore()})
}
Squad.prototype.isReadyToMove = function(){
    return this.squad.every(function(item){return item.isReadyToMove()})
}
Squad.prototype.isReadyToFight = function(){
    return this.squad.every(function(item){return item.isReadyToFight()})
}
Squad.prototype.clone = function() {
    return new Squad(this.squad.map(function(item){return item.clone()}))
}
Squad.prototype.onlyReadyToFight = function() {
    return this.squad = this.squad.filter(function(item){return item.isReadyToFight()})
}
Squad.prototype.onlyReadyToMove = function() {
    return this.squad = this.squad.filter(function(item){return item.isReadyToMove()})
}
Squad.prototype.shuffle = function() {
    var cloneSquad = new Squad(res = [])
    this.squad.forEach(function(el) {
        Math.round(Math.random()) > .5 ? res.push(el) : res.unshift(el)})
    return  this.squad = cloneSquad.squad
}