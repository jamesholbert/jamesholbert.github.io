soundPeeps = [
	{
		'name': 'James',
		'notAvailable': ['February 2', 'January 26', 'February 23', 'March 22', 'April 19'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Romney',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Pete',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Cheryl',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Curt',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Hunter',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Isaac',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	}
]

sundays = [
"January, 3",
"January, 10",
"January, 17",
"January, 24",
"January, 31",
"February, 7",
"February, 14",
"February, 21",
"February, 28",
"March, 7",
"March, 14",
"March, 21",
"March, 28",
"April, 4",
"April, 11",
"April, 18",
"April, 25",
"May, 2",
"May, 9",
"May, 16",
"May, 23",
"May, 30",
"June, 6",
"June, 13",
"June, 20",
"June, 27",
]

calendar = [
	
]
for sunday in sundays:
	# find month as month
	month = sunday.split(' ', 1)[0]
	# print(sunday)
	# find first person who is available
	candidateIndex = -1
	candidateTotal = -1
	candidateDelay = 0
	personIndex=-1

	# do the math on each person to get the right candidate
	for person in soundPeeps:
		personIndex+=1
		# print(personIndex)
		# print(person['total'])
		if month not in person['notAvailable'] and sunday not in person['notAvailable']:
			# find who has the fewest tallies and hasn't ran sound in a while
			if candidateDelay+candidateTotal < person['total']+person['delay']:
				candidateDelay=person['delay']
				candidateTotal=person['total']
				candidateIndex=personIndex
	#subtract one to everyones delay
	# for person in soundPeeps:
	for i in range(0,len(soundPeeps)):
		soundPeeps[i]['delay']+=1

	#modify candidate in soundPeeps array
	# print(soundPeeps[candidateIndex])
	soundPeeps[candidateIndex]['total']-=1
	soundPeeps[candidateIndex]['delay']=0


	# print out Sunday and Person
	print('<div>' + sunday + ': ' + soundPeeps[candidateIndex]['name'] + '</div>')
	# print('<div class="left-column">' + sunday + '</div>' + '<div class="right-column">' + soundPeeps[candidateIndex]['name'] + '</div>')
# for person in soundPeeps:
# 	print person























