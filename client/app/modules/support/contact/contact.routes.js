/**
 * Contact routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for contact routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Contact routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'contact-us',
                config: {
                    url: '/support/contact',
                    templateUrl: 'client/app/modules/support/contact/contact-us.html',
                    controller: 'ContactUsController',
                    controllerAs: 'vm',
                    title: 'Contact',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
			{
                state: 'contact-trainer',
                config: {
                    url: '/trainers/{trainerId}/contact',
					templateUrl: 'client/app/modules/support/contact/contact-trainer.html',
                    controller: 'ContactTrainerController',
                    controllerAs: 'vm',
                    title: 'ContactTrainer',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
