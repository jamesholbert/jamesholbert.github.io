document.getElementById("s5").innerHTML = ""; //Set the div's to "" so that determineTier() finds and empty div
document.getElementById("s4").innerHTML = "";
document.getElementById("s3").innerHTML = "";
document.getElementById("s2").innerHTML = "";
document.getElementById("s1").innerHTML = "";

function btnBlast() {
	setSkill(determineTier(), "Blast", "1+X", ("X damage, " + determineTier() + " range, deduct Y damage to add (Y x 2) range. Chargable. Can't convert charged damage to range.").fontsize(1));
}
function btnCombatSpecialist() {
	setSkill(determineTier(), "Combat Specialist", "-", "+1 melee damage.");
}
function btnHealth() {
	setSkill(determineTier(), "Health", "-", "");
}
function btnBarbedArrowhead() {
	setSkill(determineTier(), "Barbed Arrowhead", "-", "Arrows deal +1 damage.");
}
function btnStamina() {
	setSkill(determineTier(), "Stamina", "-", "");
}
function btnCallPet() {
	setSkill(determineTier(), "Call Pet", "-", "Pet has 2 hp and stamina equal to X-1. Max # of pets is [tier]. Each called pet can borrow one of it's caller's skills, which makes it unusable to caller. Caller can recall pet and regain excess stamina on their turn.");
}
function btnRemove() {												//Clear from the bottom up
	for (x=1;x<6;x++) {
		if (document.getElementById("s" + x).innerHTML != "") {  			
			setSkill(x,"");
			break;
		}
	}
}
function determineTier() {											//Skills fill top first, so check from the top
	for (x=5;x>=1;x--) {
		if (document.getElementById("s" + x).innerHTML == "") {
			return x;
		}
	}
}

function setSkill(number, skill, cost, desc) {  //Add Stat to bump and remove "updateStat function"
	var s = "s" + number;
	var c = "c" + number;
	var d = "d" + number;
	var s2 = "s2-" + number;
	if (skill == "") {
		document.getElementById(s).className = "inactive skill-main";
		document.getElementById(c).className = "inactive tiny";
		document.getElementById(d).className = "inactive description";
		document.getElementById(s2).className = "inactive standard skill-main";		
		document.getElementById(s).innerHTML = "";
		document.getElementById(s2).innerHTML = "";
		document.getElementById(c).innerHTML = "";
		document.getElementById(d).innerHTML = "";
	} else if (number != 0) {
		document.getElementById(s).className = "active skill-main";						//These elses are in case they don't use remove before switching the bottom skill from something that uses the 'cost' and 'desc' fields to one that doesn't
		document.getElementById(s2).className = "active skill-main";
		if (cost != "-") {document.getElementById(c).className = "active tiny";} else {document.getElementById(c).className = "inactive tiny";}  
		if (desc != "") {document.getElementById(d).className = "active description big-description";} else {document.getElementById(d).className = "inactive description";}
		document.getElementById(s).innerHTML = skill;
		document.getElementById(s2).innerHTML = skill;
		document.getElementById(c).innerHTML = cost;
		document.getElementById(d).innerHTML = desc;
	}
	updateStats();
}

function updateStats() {
	var tempHP = 3;
	var tempSta = 1;
	var ranged = 0;
	var range = 0;
	var melee = 1;
	for (x=1;x<=5;x++) {
		if (document.getElementById("s"+x).innerHTML == "Barbed Arrowhead") { //Sharpshooter, Quick Draw, Longbow
			ranged=1;															//This is to set Ranged damage to 1 if there's a ranged skill, but leaves it at zero (to be blank) if there isn't
			range=2;
		}
	}	
	for (x=1;x<=5;x++) {
		if (document.getElementById("s"+x).innerHTML == "Health") {
			tempHP += 2*x;
		} else if (document.getElementById("s"+x).innerHTML == "Combat Specialist") {
			melee +=1;
		} else if (document.getElementById("s"+x).innerHTML == "Stamina") {
			tempSta += 2*x;
		} else if (document.getElementById("s"+x).innerHTML == "Fortify") {
			tempSta += 1;
			tempHP +=1;
		} else if (document.getElementById("s"+x).innerHTML == "Barbed Arrowhead") {
			ranged+=1
		}
	}
	document.getElementById("hp").innerHTML = tempHP;
	document.getElementById("stamina").innerHTML = tempSta;
	document.getElementById("ranged").innerHTML = ranged;
	document.getElementById("range").innerHTML = range;
	document.getElementById("melee").innerHTML = melee;
	document.getElementById("ranged").className = "tiny stat";
	document.getElementById("range").className = "tiny stat";
	if (ranged==0) {
		document.getElementById("ranged").innerHTML = "";
		document.getElementById("range").innerHTML = "";
		document.getElementById("ranged").className = "tiny inactive stat";
		document.getElementById("range").className = "tiny inactive stat";

	}
}

google.charts.load('current', {'packages':['table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawGID);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawGID() {
var queryString = encodeURIComponent('SELECT J, K, L, M, N, O, P LIMIT 25');

var query = new google.visualization.Query(
  'https://docs.google.com/spreadsheets/d/1JcSyLLXP9QdB15cNWno1P1p9SgiSPgVpbeKlDecjgkI/gviz/tq?gid=0&headers=1&tq=' + queryString);
query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart_div'));
  document.getElementById("chart_div").style.color = "black";
  chart.draw(data);
}

