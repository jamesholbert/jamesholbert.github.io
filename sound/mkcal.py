soundPeeps = [
	{
		'name': 'James',
		'notAvailable': [],
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
		'notAvailable': ['October'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Hunter',
		'notAvailable': ['October'],
		'total': 0,
		'delay': 0
	},
	{
		'name': 'Isaac',
		'notAvailable': [],
		'total': 0,
		'delay': 0
	},
	# {
	# 	'name': 'Joe',
	# 	'notAvailable': [],
	# 	'total': 0,
	# 	'delay': 0
	# },
]

sundays = [
# 'January 6',
# 'January 13',
# 'January 20',
# 'January 27',
# 'February 3',
# 'February 10',
# 'February 17',
# 'February 24',
# 'March 3',
# 'March 10',
# 'March 17',
# 'March 24',
# 'March 31',
# 'April 7',
# 'April 14',
# 'April 21',
# 'April 28',
# 'May 5',
# 'May 12',
# 'May 19',
# 'May 26',
# 'June 2',
# 'June 9',
# 'June 16',
# 'June 23',
# 'June 30'
'July 7',
'July 14',
'July 21',
'July 28',
'August 4',
'August 11',
'August 18',
'August 25',
'September 1',
'September 8',
'September 15',
'September 22',
'September 29',
'October 6',
'October 13',
'October 20',
'October 27',
'November 3',
'November 10',
'November 17',
'November 24',
'December 1',
'December 8',
'December 15',
'December 22',
'December 29'
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























