/**
 * Spec Helper Functions
 * @namespace Test.Utils
 */
/* jshint -W098 */
var specHelper = (function() {
    var service = {
		compileRouteTemplateWithController: compileRouteTemplateWithController,
        verifyNoOutstandingHttpRequests: verifyNoOutstandingHttpRequests
    };

    return service;

	/* Functions */

	/**
	 * @name compileRouteTemplateWithController
	 * @desc Instantiate context surrounding the given state, including
	 * scope, controller, and render function
	 * @param {$injector} $injector
	 * @param {state} state The route state to compile
	 * @memberof Tests.Utils
	 */
	function compileRouteTemplateWithController($injector, state, controller) {
	    var $rootScope = $injector.get('$rootScope');
	    var $templateCache = $injector.get('$templateCache');
	    var $compile = $injector.get('$compile');
	    var $state = $injector.get('$state');
	    var $controller = $injector.get('$controller');

	    var scope = $rootScope.$new();
	    var stateDetails = $state.get(state);
	    var html = $templateCache.get(stateDetails.templateUrl);

	    var ctrl = scope[state] = $controller(controller);
	    $rootScope.$digest();
	    var compileFn = $compile(angular.element('<div></div>').html(html));

	    return {
	        controller: ctrl,
	        scope: scope,
	        render: function () {
	            var element = compileFn(scope);
	            $rootScope.$digest();
	            return element;
	        }
	    };
	}

	/**
	 * @name verifyNoOutstandingHttpRequests
	 * @desc Uses $httpBackend to verify there are no outstanding http requests
	 * @memberof Test.Utils
	 */
    function verifyNoOutstandingHttpRequests () {
        afterEach(inject(function($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));
    }
})();
