soundPeeps = [
	{
		'name': 'James',
		'notAvailable': ['February 2', 'January 26', 'February 23', 'March 22', 'April 19'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Scott',
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
		'notAvailable': ['May 24', 'April'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Hunter',
		'notAvailable': ['May 24'],
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
'January 5',
'January 12',
'January 19',
'January 26',
'February 2',
'February 9',
'February 16',
'February 23',
'March 1',
'March 8',
'March 15',
'March 22',
'March 29',
'April 5',
'April 12',
'April 19',
'April 26',
'May 3',
'May 10',
'May 17',
'May 24',
'May 31',
'June 7',
'June 14',
'June 21',
'June 28',
'July 5',
'July 12',
'July 19',
'July 26',
'August 2',
'August 9',
'August 16',
'August 23',
'August 30',
'September 6',
'September 13',
'September 20',
'September 27',
'October 4',
'October 11',
'October 18',
'October 25',
'November 1',
'November 8',
'November 15',
'November 22',
'November 29',
'December 6',
'December 13',
'December 20',
'December 27'
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























