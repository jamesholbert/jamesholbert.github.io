from random import randint
import os
#for x in range(0,100):
	#print (randint(0,9))
def strike(text):
	return ''.join([u'\u0336{}'.format(c) for c in text])

class dice:
	def __init__(self, name, first, second, third, fourth, fifth, sixth):
		self.name = name
		self.first = first
		self.second = second
		self.third = third
		self.fourth = fourth
		self.fifth = fifth
		self.sixth = sixth
	def roll(self):
		x = randint(0, 5)
		if x == 0:
			return self.first
		elif x == 1:
			return self.second
		elif x == 2:
			return self.third
		elif x == 3:
			return self.fourth
		elif x == 4:
			return self.fifth
		elif x == 5:
			return self.sixth
def findType(type):
	typeIndex = 0
	for die in totalDice:
		if die.name == type:
			return typeIndex
		else:
			typeIndex += 1
	return 99
def showDice():
	print "You have:"
	for die in totalDice:
		print die.name	

CP = 10
aD = 0
pD = 0
sD = 0
mD = 0
strD = 0
dexD = 0
intD = 0
totalDice = []
s = "Success"
b = "Blank"
end = False

while end == False:
	while CP > 0:
		if CP != 10:
			showDice()
		print "You have " + str(CP) + " CP remaining. Spend 1 to:"
		print "1. Action Die"
		if aD > 0: 
			print "2: Upgrade an action die to a Proficiency Die"
			print "3: Upgrade an action die to a Strength Die"
			print "4: Upgrade an action die to a Dexterity Die"
			print "5: Upgrade an action die to an Intelligence Die"
		else:
			print strike("2: Upgrade an action die to a Proficiency Die")
			print strike("3: Upgrade an action die to a Strength Die")
			print strike("4: Upgrade an action die to a Dexterity Die")
			print strike("5: Upgrade an action die to an Intelligence Die")
		if pD > 0:
			print "6: Upgrade a proficiency die to a Savvy Die"
			print "7: Upgrade a proficiency die to a Mastery Die"
		else:
			print strike("6: Upgrade a proficiency die to a Savvy Die")
			print strike("7: Upgrade a proficiency die to a Mastery Die")
		choice = raw_input()
		if choice == "1":
			totalDice.append(dice("Action Die", s, s, b, b, b, b))
			CP -= 1
			aD += 1
		elif choice == "2" and aD > 0:
			totalDice.append(dice("Proficiency Die", s, s, s, "Exploit", b, b))
			CP -= 1
			aD -= 1
			pD += 1
			totalDice.pop(findType("Action Die"))
		elif choice == "3" and aD > 0:
			totalDice.append(dice("Strength Die", "Strength", "Strength", "Strength", b, b, b))
			CP -= 1
			aD -= 1
			totalDice.pop(findType("Action Die"))
		elif choice == "4" and aD > 0:
			totalDice.append(dice("Strength Die", "Dexterity", "Dexterity", "Dexterity", b, b, b))
			CP -= 1
			aD -= 1
			totalDice.pop(findType("Action Die"))
		elif choice == "5" and aD > 0:
			totalDice.append(dice("Strength Die", "Intelligence", "Intelligence", "Intelligence", b, b, b))
			CP -= 1
			aD -= 1
			totalDice.pop(findType("Action Die"))
		elif choice == "6" and pD > 0:
			totalDice.append(dice("Savvy Die", s, s, s, "Exploit", "Exploit", b))
			CP -= 1
			pD -= 1
			totalDice.pop(findType("Proficiency Die"))
		elif choice == "7" and pD > 0:
			totalDice.append(dice("Mastery Die", s, s, s, "Exploit", s, b))		
			CP -= 1
			pD -= 1
			totalDice.pop(findType("Proficiency Die"))
		os.system('clear')

	print "What do you want to do?"
	print "1: Roll"
	print "2: See Dice"
	print "9: Level up"
	print "0: Quit"
	choice = raw_input()
	if choice == "1":
		os.system('clear')
		for die in totalDice:
			print die.roll()
	elif choice == "2":
		os.system('clear')
		showDice()
	elif choice == "9":
		CP = 1
	elif choice == "0":
		end = True























# testDie = actionDie()
# print testDie.roll()