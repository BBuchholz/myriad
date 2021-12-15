const KnechtController = require('./KnechtController');
const magisterLudi = KnechtController();

describe('deal function', () => {

	it('should deal sequentially with a deal count parameter', () => {

		const currentDeck = ['4D', '5W', '3C', '2S',
							 '6D', '5S', '3D', '2W',
							 '9D', '6W', '8C', '4S'];
							 
		const currentDeckLength = currentDeck.length;
							 
		var deal = magisterLudi.deal(currentDeck, 4);
		const expectedFourCardDeal = ['4D', '5W', '3C', '2S'];
		expect(expectedFourCardDeal).toStrictEqual(deal.dealtCards);
		expect(deal.remainingDeck.length).toBe(currentDeckLength - 4);

	});
});

describe('all possible combos function', () => {

	it('should supply all possible combos for two given sets of card keys', () => {

		const setOne = ['2C', '3C', '4C'];
		const setTwo = ['5W', '6W', '7W'];

		const expectedResultOneA = ['2C', '5W'];
		const expectedResultOneB = ['2C', '6W'];
		const expectedResultOneC = ['2C', '7W'];

		const expectedResultTwoA = ['3C', '5W'];
		const expectedResultTwoB = ['3C', '6W'];
		const expectedResultTwoC = ['3C', '7W'];

		const expectedResultThreeA = ['4C', '5W'];
		const expectedResultThreeB = ['4C', '6W'];
		const expectedResultThreeC = ['4C', '7W'];

		var allPossible = magisterLudi.allPossibleCombos(setOne, setTwo);
		expect(allPossible[0]).toBe(expectedResultOneA);
		expect(allPossible[1]).toBe(expectedResultOneB);
		expect(allPossible[2]).toBe(expectedResultOneC);

		expect(allPossible[3]).toBe(expectedResultTwoA);
		expect(allPossible[4]).toBe(expectedResultTwoB);
		expect(allPossible[5]).toBe(expectedResultTwoC);

		expect(allPossible[6]).toBe(expectedResultThreeA);
		expect(allPossible[7]).toBe(expectedResultThreeB);
		expect(allPossible[8]).toBe(expectedResultThreeC);

	});
});

describe('scenarios', () => {

	const expectedScenarios = 
		[
			[0, '4D', '5W', '3C', '2S'],
			[1, '6D', '5S', '3D', '2W'],
			[2, '9D', '6W', '8C', '4S'],
			[3, '5C', '8D', '3S', '2D'],
			[4, '7D', '5D', '3W', '10S'],
			[5, '7W', '8W', '6S', '9S'],
			[6, '7C', '10D', '9W', '2C'],
			[7, '10W', '10C', '9C', '4C'],
			[8, '8S', '7S', '4W', '6C']
		];

	var scenarios = magisterLudi.getScenarios();			

	test.each(expectedScenarios)(
		"given scenario index %p, returns four cards, %p, %p, %p, and %p",
		(scenarioIndex, daemonCard, playerCardOne, playerCardTwo, playerCardThree) => {

			var scenario = scenarios[scenarioIndex];
			expect(scenario.daemonCard.power).toBe(daemonCard);
			expect(scenario.daemonCard.description).toBe(magisterLudi.cardToDescription(scenario.daemonCard.power));
			expect(scenario.playerCards[0].power).toBe(playerCardOne);
			expect(scenario.playerCards[0].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[0].power));
			expect(scenario.playerCards[1].power).toBe(playerCardTwo);
			expect(scenario.playerCards[1].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[1].power));
			expect(scenario.playerCards[2].power).toBe(playerCardThree);
			expect(scenario.playerCards[2].description).toBe(magisterLudi.cardToDescription(scenario.playerCards[2].power));

		}
	);
});

describe('delta utils', () => {

	const suitToHDeltaCases = 
		[
			['W', 1], 
			['C', -1], 
			['S', 1], 
			['D', -1], 
			['?', 0]
		];

	test.each(suitToHDeltaCases)(
		"given suit %p as arg, returns HDelta of %p",
		(suitArg, expectedResult) => {
			const result  = magisterLudi.getHDeltaFromSuit(suitArg);
			expect(result).toEqual(expectedResult);
		}
	);

	const suitToMDeltaCases = 
		[
			['W', -1], 
			['C', 1], 
			['S', 1], 
			['D', -1], 
			['?', 0]
		];

	test.each(suitToMDeltaCases)(
		"given suit %p as arg, returns MDelta of %p",
		(suitArg, expectedResult) => {
			const result  = magisterLudi.getMDeltaFromSuit(suitArg);
			expect(result).toEqual(expectedResult);
		}
	);
});

