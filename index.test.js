const { 
	KnechtController 
} = require('./index');


it('should have KnechtController defined in index', () => {

	const testController = KnechtController();
	expect(testController).toBeDefined();
});	