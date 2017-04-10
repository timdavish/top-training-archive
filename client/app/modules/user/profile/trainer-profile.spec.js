/**
 * user.profile.trainer-profile.spec
 * @namespace Tests
 */

// Suite block
describe('Unit: user.profile.trainer-profile', function() {

	// Include modules before each describe or it in this block
	beforeEach(module('app'));

	// Suite block
	describe('Page: trainer-profile', function() {
		// Global variables inside this block
		var render,
			element,
			ctrl,
			scope;

		// Inject dependencies
		beforeEach(inject(function($injector) {
			var routeDetails = compileRouteTemplateWithController($injector, 'trainer-profile', 'TrainerProfileController');

			ctrl = routeDetails.controller;
			scope = routeDetails.scope;

			render = function() {
				element = routeDetails.render();
			};
		}));
	});
});
