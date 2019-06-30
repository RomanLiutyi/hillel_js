function MilitaryResource(type, health, distance) {
    this.type = type;
    this.health = health;
    this.maxHealth = 500;
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
	this.squad = [];
	if(defaultResource)
        this.combineResources(defaultResource)
}
Squad.prototype.combineResources = function(resurcesToСombine){
	return this.squad = this.squad.concat(resurcesToСombine);
}
Squad.prototype.restore = function(){
	this.squad.forEach(function(unit){
		unit = unit.restore();
    })
    return this.squad
}
Squad.prototype.isReadyToMove = function(){
    var flag = true;
	this.squad.forEach(function(unit){
        if (!unit.isReadyToMove()){
            return flag = false
        }         
    });return flag
}
Squad.prototype.isReadyToFight = function(){
    var flag = true;
	this.squad.forEach(function(unit){
        if (!unit.isReadyToMove()){
            return flag = false
        }         
    });return flag
}
Squad.prototype.clone = function(){
    var cloneSquad = new Squad();
    var unit;
    for (var key in this.squad) {
            unit = this.squad[key]
            cloneSquad.combineResources(unit.clone());
    }
    return cloneSquad
}

Squad.prototype.shuffle = function() {  
    var cloneSquad = new Squad();
    var i = this.squad.length;
    for (i; i > 0; i--) {
        cloneSquad.combineResources((this.squad.splice( Math.round(Math.random() * (i-1)), 1)[0]).clone());
    }
    return this.squad = cloneSquad.squad
}