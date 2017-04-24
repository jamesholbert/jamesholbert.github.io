                                //elem.style.display = 'none'; // hide
                                //elem.style.display = 'block'; // show - use this for block elements (div, p)
                                //elem.style.display = 'inline'; // show - use this for inline elements (span, a)
                        var s = "Success";
                        var b = "Blank";
                        var e = "Exploit";
                        var totalDice = [];
                        var actionDice = 0;
                        var profDice = 0;
                        function save() {
                        	try {
                        		localStorage.setItem(cName.innerHTML+"dice", JSON.stringify(totalDice));
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
                          var min = Math.ceil(1);
                          var max = Math.floor(6);
                          return Math.floor(Math.random() * (max - min)) + min;
                        }
                        function findType(type) {
                            var x = totalDice.length;
                            for (var i = 0; i < x; i++) {
                                if (totalDice[i].name === type) {
                                    return i;
                                } 
                            }
                            console.log("Didn't find type");
                            return 99;
                        }
                        function updateButtons() {
                            if (CP === 0) {
                                outOfCP();
                            } else {
                            	if (actionDice === 0) {
	                                btnProf.style.display="none";
	                                btnStr.style.display="none";
	                                btnDex.style.display="none";
	                                btnInt.style.display="none";
                            	} else {
                            		btnProf.style.display="inline";
	                                btnStr.style.display="inline";
	                                btnDex.style.display="inline";
	                                btnInt.style.display="inline";
                            	}
                            	if (profDice === 0) {
                            		btnSavvy.style.display="none";
                            		btnMastery.style.display="none";
                            	} else {
	                                btnSavvy.style.display="inline";
	                                btnMastery.style.display="inline";
                            	}
                            }	

                        }
                        function outOfCP() {
                            btnProf.style.display='none';
                            btnSavvy.style.display = 'none';
                            btnMastery.style.display = 'none';
                            btnStr.style.display = 'none';
                            btnDex.style.display = 'none';
                            btnInt.style.display = 'none';
                            btnAction.style.display = 'none';
                            if (totalDice.length === 0) {
                                btnRoll.style.display = 'none';
                            	btnAction.style.display = 'inline';
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
                        CP = 10
                        texter.innerHTML = "Time to create a character! You have " + CP + " CP remaining.";
                        function updateTexter() {
                            if (CP > 0) {
                                texter.innerHTML = "Time to work on your character! You have " + CP + " CP remaining.";
                            } else {
                                texter.innerHTML = "";
                            }
                            btnRoll.style.display = "block";
                            var x = totalDice.length;
                            for (var i = 0; i < x; i++) {
                                console.log(totalDice[i].name);
                            }                        
                        }
                        function levelUp() {
                            CP += 1;
                            updateTexter();
                            btnAction.style.display = 'inline';
                            var x = findType("Proficiency Dice");
                            if (profDice > 0) {
                                btnSavvy.style.display="inline";
                                btnMastery.style.display="inline";
                            }
                            if (actionDice > 0) {
								btnProf.style.display="block";
                                btnStr.style.display="inline";
                                btnDex.style.display="inline";
                                btnInt.style.display="inline";
                            }
                        }
                        function btnAddAction() {
                            CP -= 1;
                            actionDice +=1;
                            totalDice.push(new dice("Action Die", s, s, b, b, b, b))
                            if (CP > 0) {
                                btnProf.style.display="block";
                                btnStr.style.display="inline";
                                btnDex.style.display="inline";
                                btnInt.style.display="inline";
                            } else {
                                outOfCP();
                            }
                            updateTexter();
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
                            totalDice.push(new dice("Savvy Die", s, s, s, e, e, b))
                            updateButtons();

                            var x = findType("Proficiency Die");
                            totalDice.splice(x, 1);
                            updateTexter();
                        }
                        function btnAddMastery() {
                            CP -= 1;
                            profDice-=1;
                            totalDice.push(new dice("Mastery Die", s, s, s, s, e, b))
                            updateButtons();
                            var x = findType("Proficiency Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();                        
                        }
                        function btnAddStr() {
                            CP -= 1;
                            actionDice -= 1;
                            totalDice.push(new dice("Strength Die", "Strength", "Strength", "Strength", b, b, b))
                            updateButtons();
                            var x = findType("Action Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();                        }
                        function btnAddDex() {
                            CP -= 1;
                            actionDice -= 1;
                            totalDice.push(new dice("Dexterity Die", "Dexterity", "Dexterity", "Dexterity", b, b, b))
                            updateButtons();
                            var x = findType("Action Die");
                            totalDice.splice(x, 1);                            
                            updateTexter();   
                        }
                        function btnAddInt() {
                            CP -= 1;
                            actionDice -= 1;
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
                            console.log(results);
                            updateTexter();
                            resSuccesses.innerHTML = "Successes: " + successes;
                            resExp.innerHTML = "Exploits " + exploits;
                            resStr.innerHTML = "Strength: " + str;
                            resDex.innerHTML = "Dexterity: " + dex;
                            resInt.innerHTML = "Intelligence: " + int;
                            resBlanks.innerHTML = "Blanks: " + blanks;
                            
                        }

                        outOfCP();
