function btnBlast() {
	setSkill(determineTier(), "Blast", "1+X", "Make the big booms");
}
function btnHealth() {
	setSkill(determineTier(), "Health", "-", "");

}
function btnStamina() {
	setSkill(determineTier(), "Stamina", "-", "");

}
function btnRemove() {
	for (x=1;x<6;x++) {
		if (document.getElementById("s" + x).innerHTML != "") {
			setSkill(x,"");
			break;
		}
	}
}
function determineTier() {
	for (x=5;x>1;x--) {
		if (document.getElementById("s" + x).innerHTML == "") {
			return x;
		}
	}
	return 1;
}

function setSkill(number, skill, cost, desc) {
	var s = "s" + number;
	var c = "c" + number;
	var d = "d" + number;
	if (skill == "") {
		document.getElementById(s).className = "inactive";
		document.getElementById(c).className = "inactive tiny";
		document.getElementById(d).className = "inactive description";
		document.getElementById(s).innerHTML = "";
		document.getElementById(c).innerHTML = "";
		document.getElementById(d).innerHTML = "";
	} else {
		document.getElementById(s).className = "active";
		if (cost != "-") {document.getElementById(c).className = "active tiny";}
		if (desc != "") {document.getElementById(d).className = "active description";}
		document.getElementById(s).innerHTML = skill;
		document.getElementById(c).innerHTML = cost;
		document.getElementById(d).innerHTML = desc;
	}
}

google.charts.load('current', {'packages':['table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawGID);
google.charts.setOnLoadCallback(drawGID2);

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
  chart.draw(data);
}

