function MilitaryResource(type, health, distance) {
  this.type = type;
  this.health = health;
  this.maxHealth = 1000;
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
  defaultResource ? this.squad = defaultResource : []
}
var resource = [
  new MilitaryResource('tank', 100, 4822),
  new MilitaryResource('water', 900, 555),
  new MilitaryResource('air', 800, 100),
  new MilitaryResource('water', 500, 888)
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
function card(object){
  var i =0;
  document.getElementById('root').innerHTML = '';
  for (const i in object) {
    if (object.hasOwnProperty(i)) {
      var unit = object[i]
      
      document.getElementById('root').innerHTML += '<div class="card"></div>';
      document.getElementsByClassName('card')[i].innerHTML += '<div class="maxHealth"><span class="info__text">'+ unit.health+'/'+ unit.maxHealth +'</span></div>'
      document.getElementsByClassName('maxHealth')[i].innerHTML += '<div class="health" style="width: '+ unit.health/unit.maxHealth*100 +'%"></div>'
      document.getElementsByClassName('card')[i].innerHTML += '<div class="maxDistance"><span class="info__text">'+ unit.distance+'/'+ unit.maxDistance +'</span></div>'
      document.getElementsByClassName('maxDistance')[i].innerHTML += '<div class="distance" style="width: '+ (100 -unit.distance/unit.maxDistance*100) +'%"></div>'
      document.getElementsByClassName('card')[i].innerHTML += '<div class="type">'+ unit.type +'</div>'
      document.getElementsByClassName('card')[i].innerHTML += '<div class="img img__'+unit.type+'" bacground-image: url(img/' + unit.type +'.jpg)>'
      document.getElementsByClassName('card')[i].innerHTML += '<div class="btn__box"></div>'
      document.getElementsByClassName('btn__box')[i].innerHTML += '<input type="button" value="atack" class="btn btn--atack" id="atack_unit'+ [i] +'" >'
      document.getElementsByClassName('btn__box')[i].innerHTML += '<input type="button" value="walk" class="btn btn--walk" id="walk_unit'+ [i] +'" >';
      if (object[i].distance >= object[i].maxDistance){
        document.getElementsByClassName('card')[i].classList.toggle("mask");
        }
    }
  }
  for (const i in object) {
    if (object.hasOwnProperty(i)) {
      document.getElementById('atack_unit'+[i]).addEventListener('click', function(){
      object[i].health >= 0.1*object[i].maxHealth ? object[i].health -= 0.1*object[i].maxHealth : ( object.splice(object.indexOf(i), 1));
      card(object);
      })
    }
  }
  for (const i in object) {
    if (object.hasOwnProperty(i)) {
    document.getElementById('walk_unit'+[i]).addEventListener('click', function(){
      object[i].distance <= 0.9*object[i].maxDistance ?
        object[i].distance += 0.1*object[i].maxDistance :
          object[i].distance = object[i].maxDistance;
      card(object);
      })
    }
  }
}
var aaa = new Squad(resource);
card(aaa['squad']);