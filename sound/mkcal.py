soundPeeps = [
	{
		'name': 'James',
		'notAvailable': ['August'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Scott',
		'notAvailable': ['April'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Pete',
		'notAvailable': ['May'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Cheryl',
		'notAvailable': ['July'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Curt',
		'notAvailable': ['July'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Hunter',
		'notAvailable': ['August', 'September', 'August','November','December'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Isaac',
		'notAvailable': ['November'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Joe',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
]

sundays = [
'July 1',
'July 8',
'July 15',
'July 22',
'July 29',
'August 5',
'August 12',
'August 19',
'August 26',
'September 2',
'September 9',
'September 16',
'September 23',
'September 30',
'October 7',
'October 14',
'October 21',
'October 28',
'November 4',
'November 11',
'November 18',
'November 25',
'December 2',
'December 9',
'December 16',
'December 23',
'December 30']

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
		if month not in person['notAvailable']:
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























