                                //elem.style.display = 'none'; // hide
                                //elem.style.display = 'block'; // show - use this for block elements (div, p)
                                //elem.style.display = 'inline'; // show - use this for inline elements (span, a)
                        var s = "Success";
                        var b = "Blank";
                        var e = "Exploit";
                        var totalDice = [];
                        var actionDice = 0;
                        var profDice = 0;
                        var savvyDice = 0;
                        var masteryDice = 0;
                        var strDice = 0;
                        var dexDice = 0;
                        var intDice = 0;
                        function save() {
                        	try {
                        		localStorage.setItem(getElementById("characterName")+"dice", JSON.stringify(totalDice));
                        	} catch (err) {
                        		alert("Failed!");
                        	}
                        }
                        function load() {
                        	try {
                        		var totalDice = JSON.parse(localStorage.getItem(cName.innerHTML+"dice"));
                        	} catch(err) {
                        		alert("Failed!");
                        	}	
                        }
                        function getRandomInt() {
                          var min = Math.ceil(7);
                          var max = Math.floor(1);
                          return Math.floor(Math.random() * (max - min)) + min;
                        }
                        function findType(type) {
                            var x = totalDice.length;
                            for (var i = 0; i < x; i++) {
                                if (totalDice[i].name === type) {
                                    return i;
                                } 
                            }
                            return 99;
                        }
                        function updateButtons() {
                            if (CP === 0) {
                                outOfCP();
                            } else {
                                if (actionDice === 0) {
                                    btnProf.style.visibility="hidden";
                                    btnStr.style.visibility="hidden";
                                    btnDex.style.visibility="hidden";
                                    btnInt.style.visibility="hidden";
                                } else {
                                    btnProf.style.visibility="visible";
                                    btnStr.style.visibility="visible";
                                    btnDex.style.visibility="visible";
                                    btnInt.style.visibility="visible";
                                }
                                if (profDice === 0) {
                                    btnSavvy.style.visibility="hidden";
                                    btnMastery.style.visibility="hidden";
                                } else {
                                    btnSavvy.style.visibility="visible";
                                    btnMastery.style.visibility="visible";
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
                            btnProf.style.visibility='hidden';
                            btnSavvy.style.visibility = 'hidden';
                            btnMastery.style.visibility = 'hidden';
                            btnStr.style.visibility = 'hidden';
                            btnDex.style.visibility = 'hidden';
                            btnInt.style.visibility = 'hidden';
                            btnAction.style.visibility = 'hidden';
                            if (totalDice.length === 0) {                                       //This is just for the very first time the function is called
                                btnRoll.style.visibility = 'hidden';
                                btnAction.style.visibility = 'visible';
                            } 
                        }                      
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
                        // function drawCrates (){
                        //     var fragment = document.createDocumentFragment(),
                        //         img = document.createElement('img');

                        //     img.setAttribute("src", "images/str.png");
                        //     fragment.appendChild(img);
                        //     for(i = 0; i < 9; i++){
                        //         fragment.appendChild(img.cloneNode(true));
                        //     }

                        //     document.body.appendChild(fragment);
                        // }
                        // drawCrates();
                            // var img = new Image();
                            // img.src = "images/success.png";
                            // img.width = 10;
                            // img.height = 10;
                            // texter.appendChild(img);
                        var texter = document.getElementById('texter');  
                        var btnAction = document.getElementById('btnAction');
                        var btnProf = document.getElementById('btnProf');
                        var btnSavvy = document.getElementById('btnSavvy');
                        var btnMastery = document.getElementById('btnMastery');
                        var btnStr = document.getElementById('btnStr');
                        var btnDex = document.getElementById('btnDex');
                        var btnInt = document.getElementById('btnInt');
                        var btnRoll = document.getElementById('btnRoll');
                        var resSuccesses = document.getElementById('resSuccesses');                        
                        var resExp = document.getElementById('resExp');                        
                        var resStr = document.getElementById('resStr');                        
                        var resInt = document.getElementById('resInt');                        
                        var resDex = document.getElementById('resDex');                        
                        var resBlanks = document.getElementById('resBlanks');  
                        var cAction = document.getElementById('currentActionDice');
                        var cProf = document.getElementById('currentProfDice');
                        var cSavvy = document.getElementById('currentSavvyDice');
                        var cMastery = document.getElementById('currentMasteryDice');
                        var cStr = document.getElementById('currentStrDice');
                        var cDex = document.getElementById('currentDexDice');
                        var cInt = document.getElementById('currentIntDice');
                        CP = 10
                        texter.innerHTML = "Time to create a character! You have " + CP + " CP remaining.";
                        function updateTexter() {
                            if (CP > 0) {
                                texter.innerHTML = "You have " + CP + " CP remaining.";
                            } else {
                                texter.innerHTML = "";
                            }
                            btnRoll.style.visibility = "visible";
                            var x = totalDice.length;
                            for (var i = 0; i < x; i++) {
                                // console.log(totalDice[i].name);
                            }
                        }
                        function levelUp() {
                            CP += 1;
                            btnAction.style.visibility = 'visible';
                            var x = findType("Proficiency Dice");
                            updateButtons();
                            resSuccesses.innerHTML="Spend CP, roll your dice and see the results here!";
	                        resExp.innerHTML="";                        
	                        resStr.innerHTML="";                        
	                        resInt.innerHTML="";                        
	                        resDex.innerHTML="";                        
	                        resBlanks.innerHTML=""; 
                            updateTexter();
                        }
                        function btnAddAction() {
                            CP -= 1;
                            actionDice +=1;
                            totalDice.push(new dice("Action Die", s, s, b, b, b, b))
                            updateTexter();
                            updateButtons();
                        }
                        function btnAddProf() {
                            CP -= 1;
                            actionDice -=1;
                            profDice +=1;
                            totalDice.push(new dice("Proficiency Die", s, s, s, e, b, b))
                            updateButtons();

                            var x = findType("Action Die");
                            totalDice.splice(x, 1);
                            updateTexter();
                        }
                        function btnAddSavvy() {
                            CP -= 1;
                            profDice-=1;
                            savvyDice+=1;
                            totalDice.push(new dice("Savvy Die", s, s, s, e, e, b))
                            updateButtons();

                            var x = findType("Proficiency Die");
                            totalDice.splice(x, 1);
                            updateTexter();
                        }
                        function btnAddMastery() {
                            CP -= 1;
                            profDice-=1;
                            masteryDice+=1;
                            totalDice.push(new dice("Mastery Die", s, s, s, s, e, b))
                            updateButtons();
                            var x = findType("Proficiency Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();                        
                        }
                        function btnAddStr() {
                            CP -= 1;
                            actionDice -= 1;
                            strDice+=1;
                            totalDice.push(new dice("Strength Die", "Strength", "Strength", "Strength", b, b, b))
                            updateButtons();
                            var x = findType("Action Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();                        }
                        function btnAddDex() {
                            CP -= 1;
                            actionDice -= 1;
                            dexDice +=1;
                            totalDice.push(new dice("Dexterity Die", "Dexterity", "Dexterity", "Dexterity", b, b, b))
                            updateButtons();
                            var x = findType("Action Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();   
                        }
                        function btnAddInt() {
                            CP -= 1;
                            actionDice -= 1;
                            intDice +=1;
                            totalDice.push(new dice("Intelligence Die", "Intelligence", "Intelligence", "Intelligence", b, b, b))
                            updateButtons();
                            var x = findType("Action Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();                           
                        }
                        function btnRoller() {
                            var results = [];
                            var successes = 0;
                            var blanks = 0;
                            var str = 0;
                            var dex = 0;
                            var int = 0;
                            var exploits = 0;

                            var x = totalDice.length;
                            for (var i = 0; i < x; i++) {
                                results.push(totalDice[i].roll());
                                if (results[i] === "Success") {
                                	successes +=1
                                } else if (results[i] === "Blank") {
                                	blanks +=1
                                } else if (results[i] === "Exploit") {
                                	exploits +=1
                                } else if (results[i] === "Strength") {
                                	str +=1
                                } else if (results[i] === "Intelligence") {
                                	int +=1
                                } else if (results[i] === "Dexterity") {
                                	dex +=1
                                }
                            }
                            // console.log(results);
                            updateTexter();
                            resSuccesses.innerHTML = "Successes: " + successes;
                            resExp.innerHTML = "Exploits " + exploits;
                            resStr.innerHTML = "Strength: " + str;
                            resDex.innerHTML = "Dexterity: " + dex;
                            resInt.innerHTML = "Intelligence: " + int;
                            resBlanks.innerHTML = "Blanks: " + blanks;
                            
                        }

                        outOfCP();
