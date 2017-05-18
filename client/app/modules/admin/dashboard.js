/**
 * Controller for dashboard.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.admin')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'moment', 'user', 'logger'];

    /**
     * @namespace DashboardController
     * @desc Top nav bar controller
     * @memberof Controllers
     */
    function DashboardController($q, moment, user, logger) {
        var vm = this;

		// Users
		vm.admins = [];
		vm.trainers = [];
		vm.clients = [];
		vm.brokenUsers = [];

		vm.formatDate = formatDate;
		vm.flipApproved = flipApproved;

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.DashboardController
         */
		 function activate() {
 			// Promises that need to be resolved to activate
 			var promises = [
				getUsers()
			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

			/* Functions */

 			function activateSuccess() {
 				logger.success('Activated admin dashboard view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate admin dashboard view and ctrl', error);
 			}
 		}

		/**
         * @name getUsers
         * @desc Gets all TopTraining users
         * @memberof Controllers.DashboardController
         */
		function getUsers() {
			return user.getAll()
				.then(getUsersSuccess);

			/* Functions */

			function getUsersSuccess(users) {
				users.forEach(function(user) {
					if (user.usertype === 'Admin') {
						vm.admins.push(user);
					} else if (user.usertype === 'Trainer') {
						vm.trainers.push(user);
					} else if (user.usertype === 'Client') {
						vm.clients.push(user);
					} else {
						vm.brokenUsers.push(user);
					}
				});

				console.log(vm.users);
			}
		}

		/**
         * @name formatDate
         * @desc Formats given date using moment
		 * @param {String} date The date to translate
		 * @return {String} Formatted date
         * @memberof Controllers.DashboardController
         */
		 function formatDate(date) {
			 return moment(date).format('h:mm a, MMMM Do, YYYY');
		 }

		/**
         * @name flipApproved
         * @desc Flip approved status for a trainer
         * @memberof Controllers.DashboardController
         */
		 function flipApproved(trainer) {
		 	return user.flipApproved(trainer._id)
				.then(flipApprovedSuccess);

			/* Functions */

			function flipApprovedSuccess(newTrainer) {
				// Flip trainer's approved status in the view
				trainer.approved = !trainer.approved;
			}
		 }
    }
})();
