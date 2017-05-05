'use strict'; // use strict forces the interpreter to be more strict with errors, good for debugging

var characters = [];

// Character object constructor to be called when saved
function Character(name, level, CP, actionDice, strDice, dexDice, intDice, profDice, savvyDice, masteryDice){
  this.name = name,
  this.level = level,
  this.CP = CP,
  this.actionDice = actionDice,
  this.strDice = strDice,
  this.dexDice = dexDice,
  this.intDice = intDice,
  this.profDice = profDice,
  this.savvyDice = savvyDice,
  this.masteryDice = masteryDice;
} 

// Declare global variables
// Want to get rid of all dice totals soon and move to use of the countType() function
var s = 'Success';
var b = 'Blank';
var e = 'Exploit';
var totalDice = [];
var actionDice = 0;
var profDice = 0;
var savvyDice = 0;
var masteryDice = 0;
var strDice = 0;
var dexDice = 0;
var intDice = 0;
var CP = 10;
var level=1;

var texter = document.getElementById('texter');
var btnAction = document.getElementById('btnAction');
var btnProf = document.getElementById('btnProf');
var btnSavvy = document.getElementById('btnSavvy');
var btnMastery = document.getElementById('btnMastery');
var btnStr = document.getElementById('btnStr');
var btnDex = document.getElementById('btnDex');
var btnInt = document.getElementById('btnInt');
var btnRoll = document.getElementById('btnRoll');
var resultsDiv = document.getElementById('resultsDiv');
var cAction = document.getElementById('currentActionDice');
var cProf = document.getElementById('currentProfDice');
var cSavvy = document.getElementById('currentSavvyDice');
var cMastery = document.getElementById('currentMasteryDice');
var cStr = document.getElementById('currentStrDice');
var cDex = document.getElementById('currentDexDice');
var cInt = document.getElementById('currentIntDice');
var burntDice = document.getElementById('burntDice');
var cName = document.getElementById('characterName');

//save() function instantiates new character object, then pushes that object to characters array
// and stringifies and saves the array to local storage
function save() {
  try {
// The nested try is to check for already saved characters
//
    try { 
      characters = JSON.parse(localStorage.characters);
    } catch (err) {
      characters = [];
    }
    var player = new Character(cName.value, level, CP, actionDice, strDice, dexDice, intDice, profDice, savvyDice, masteryDice);

//  Removing the old character with the same name.
//    Eventually there should be an "Are you sure you want to overwrite this character?" prompt.
    for (var character = 0; character < characters.length; character++) {
      if (characters[character].name === player.name) {
        characters.splice(character, 1);
      }
    }
    characters.push(player);
    localStorage.characters = JSON.stringify(characters);
    console.log('saving character ' + cName.value);
  } catch (err) {
    alert('Failed! Error: ' + err);
  }
}

function load(){
  try {
    characters = JSON.parse(localStorage.characters);
    console.log(characters);

//  Gets the right index matching the character name text box
//

    for (var character = 0; character < characters.length; character++) {
      if (characters[character].name === cName.value) {
        var loadingIndex=character;
      }
    }

    totalDice = [];
    actionDice = characters[loadingIndex].actionDice;
    profDice = characters[loadingIndex].profDice;
    savvyDice = characters[loadingIndex].savvyDice;
    masteryDice = characters[loadingIndex].masteryDice;
    strDice = characters[loadingIndex].strDice;
    dexDice = characters[loadingIndex].dexDice;
    intDice = characters[loadingIndex].intDice;
    CP =characters[loadingIndex].CP;
    level=characters[loadingIndex].level;
//  This section reloads the totalDice array with new Dice objects matching the previously saved character
//

    for (var i=0;i<characters[loadingIndex].actionDice;i++) {
      totalDice.push(new dice('Action Die', s, s, b, b, b, b))
    }
    for (var i=0;i<characters[loadingIndex].profDice;i++) {
      totalDice.push(new dice('Proficiency Die', s, s, s, e, b, b))

    }
    for (var i=0;i<characters[loadingIndex].savvyDice;i++) {
      totalDice.push(new dice('Savvy Die', s, s, s, e, e, b))
    }
    for (var i=0;i<characters[loadingIndex].masteryDice;i++) {
      totalDice.push(new dice('Mastery Die', s, s, s, s, e, b))
    }
    for (var i=0;i<characters[loadingIndex].strDice;i++) {
      totalDice.push(new dice('Strength Die', 'Strength', 'Strength', 'Strength', b, b, b))
    }
    for (var i=0;i<characters[loadingIndex].dexDice;i++) {
      totalDice.push(new dice('Dexterity Die', 'Dexterity', 'Dexterity', 'Dexterity', b, b, b))
    }
    for (var i=0;i<characters[loadingIndex].intDice;i++) {
      totalDice.push(new dice('Intelligence Die', 'Intelligence', 'Intelligence', 'Intelligence', b, b, b))
    }
    resultsDiv.innerHTML = 'Character loaded.';

    updateButtons();
    updateTexter();

  } catch (error) {
    alert('Failed to load!', error);
  }
}


function getRandomInt() {
  var min = Math.ceil(7);
  var max = Math.floor(1);
  return Math.floor(Math.random() * (max - min)) + min;
}
function findType(type) {
  //var x = totalDice.length;
  for (var i = 0; i < totalDice.length; i++) {
    if (totalDice[i].name === type) {
      return i;
    }
  }
  return 99;
}
// Create function to count types!
// This way I don't need variables to keep track of them.
// Implementing soon

function countType(type) {
  var myCount = 0
  for (var i = 0; i < totalDice.length; i++) {
    if (totalDice[i].name === type) {
      myCount++;
    }
  }
  return myCount;
}

function updateButtons() {
  if (CP === 0) {
    outOfCP();
  } else {
    btnAction.style.opacity='1';
    if (actionDice === 0) {
      btnProf.style.opacity='0.5';
      btnStr.style.opacity='0.5';
      btnDex.style.opacity='0.5';
      btnInt.style.opacity='0.5';
    } else {
      btnProf.style.opacity='1';
      btnStr.style.opacity='1';
      btnDex.style.opacity='1';
      btnInt.style.opacity='1';
    }
    if (profDice === 0) {
      btnSavvy.style.opacity='0.5';
      btnMastery.style.opacity='0.5';
    } else {
      btnSavvy.style.opacity='1';
      btnMastery.style.opacity='1';
    }
  }
  cAction.innerHTML = actionDice;
  cProf.innerHTML = profDice;
  cSavvy.innerHTML = savvyDice;
  cMastery.innerHTML = masteryDice;
  cStr.innerHTML = strDice;
  cInt.innerHTML = intDice;
  cDex.innerHTML = dexDice;
}
function outOfCP() {
  btnProf.style.opacity='0.5';
  btnSavvy.style.opacity = '0.5';
  btnMastery.style.opacity = '0.5';
  btnStr.style.opacity = '0.5';
  btnDex.style.opacity = '0.5';
  btnInt.style.opacity = '0.5';
  btnAction.style.opacity = '0.5';
  if (totalDice.length === 0) {                                       //This line is just for the very first time the function is called
    btnRoll.style.opacity = '0.5';
    btnAction.style.opacity = '1';
    texter.innerHTML = 'You have ' + CP + ' CP remaining.';

  }
}


// Object caller for dice
function dice(name, first, second, third, fourth, fifth, sixth) {
  this.name = name;
  this.first = first;
  this.second = second;
  this.third = third;
  this.fourth = fourth;
  this.fifth = fifth;
  this.sixth = sixth;

  this.roll = function () {
    var myInt = getRandomInt();
    if (myInt === 1) {
      return this.first;
    } else if (myInt === 2) {
      return this.second;
    } else if (myInt === 3) {
      return this.third;
    } else if (myInt === 4) {
      return this.fourth;
    } else if (myInt === 5) {
      return this.fifth;
    } else {
      return this.sixth;
    }

  }
}


function updateTexter() {
  if (CP > 0) {
    texter.innerHTML = 'You have ' + CP + ' CP remaining.';
  } else {
    texter.innerHTML = 'Level: ' + level;
  }
  btnRoll.style.opacity = '1';
  var x = totalDice.length;
  for (var i = 0; i < x; i++) {
  }
}
function levelUp() {
  level +=1;
  CP += 1;
  btnAction.style.opacity = '1';
  var x = findType('Proficiency Dice');
  updateButtons();
  resultsDiv.innerHTML='Spend CP, roll your dice and see the results here!';
  updateTexter();
}
function btnAddAction() {
  if (CP > 0) {
    CP -= 1;
    actionDice +=1;
    totalDice.push(new dice('Action Die', s, s, b, b, b, b))
    updateTexter();
    updateButtons();
  }
}
function btnAddProf() {
  if (CP > 0 && actionDice > 0) {
    CP -= 1;
    actionDice -=1;
    profDice +=1;
    totalDice.push(new dice('Proficiency Die', s, s, s, e, b, b))
    updateButtons();

    var x = findType('Action Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnAddSavvy() {
  if (CP > 0 && profDice > 0) {

    CP -= 1;
    profDice-=1;
    savvyDice+=1;
    totalDice.push(new dice('Savvy Die', s, s, s, e, e, b))
    updateButtons();

    var x = findType('Proficiency Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnAddMastery() {
  if (CP > 0 && profDice > 0) {

    CP -= 1;
    profDice-=1;
    masteryDice+=1;
    totalDice.push(new dice('Mastery Die', s, s, s, s, e, b))
    updateButtons();
    var x = findType('Proficiency Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnAddStr() {
  if (CP > 0 && actionDice > 0) {
    CP -= 1;
    actionDice -= 1;
    strDice+=1;
    totalDice.push(new dice('Strength Die', 'Strength', 'Strength', 'Strength', b, b, b))
    updateButtons();
    var x = findType('Action Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnAddDex() {
  if (CP > 0 && actionDice > 0) {
    CP -= 1;
    actionDice -= 1;
    dexDice +=1;
    totalDice.push(new dice('Dexterity Die', 'Dexterity', 'Dexterity', 'Dexterity', b, b, b))
    updateButtons();
    var x = findType('Action Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnAddInt() {
  if (CP > 0 && actionDice > 0) {

    CP -= 1;
    actionDice -= 1;
    intDice +=1;
    totalDice.push(new dice('Intelligence Die', 'Intelligence', 'Intelligence', 'Intelligence', b, b, b))
    updateButtons();
    var x = findType('Action Die');
    totalDice.splice(x, 1);
    updateTexter();
  }
}
function btnRoller() {
  if (totalDice.length > 0) {
    var results = [];
    var iResults = [];
    resultsDiv.innerHTML = '';
    burntDice.style='border: solid black 1px; border-radius: 5px;'
    burntDice.style.opacity = '0.5';
    burntDice.innerHTML = 'Used Dice:';

    var x = totalDice.length;
    for (var i = 0; i < x; i++) {
      results.push(totalDice[i].roll());
      iResults[i]=document.createElement('img');
      if (results[i] === 'Success') {
        iResults[i].src='images/s.png';
      } else if (results[i] === 'Blank') {
        iResults[i].src='images/blank.svg';
      } else if (results[i] === 'Exploit') {
        iResults[i].src='images/se.png';
      } else if (results[i] === 'Strength') {
        iResults[i].src='images/ss.png';
      } else if (results[i] === 'Intelligence') {
        iResults[i].src='images/si.png';
      } else if (results[i] === 'Dexterity') {
        iResults[i].src='images/sd.png';
      }
      iResults[i].style='width:40px; border-radius:5px;';
      iResults[i].onclick= function() {
        burntDice.style.opacity = '1';

        var thisClone=document.createElement('img');
        thisClone.src=this.src;
        this.onclick=''
        this.src='images/damage.png'
        thisClone.style='width:40px; border-radius:5px;';
        burntDice.appendChild(thisClone);

      }
      resultsDiv.appendChild(iResults[i]);
    }

    updateTexter();
  }
}

outOfCP();
