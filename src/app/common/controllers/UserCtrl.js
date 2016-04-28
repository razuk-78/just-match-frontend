angular.module('just.common')
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }])
    .controller('UserCtrl', ['userService', '$scope', 'Resources', 'authService', 'justFlowService', 'justRoutes', '$q', '$filter', 'jobService',
        function (userService, $scope, Resources, authService, flow, routes, $q, $filter, jobService) {
            var that = this;

            this.isStart = 1;

            if (!authService.isAuthenticated()) {
                flow.redirect(routes.user.select.url, function () {
                    flow.redirect(routes.user.user.url);
                });
            }

            this.model = {};
            this.model.data = {};
            this.model.data.attributes = {};

            this.model = userService.userModel();
            this.message = userService.userMessage;


            this.model.$promise.then(function (response) {
                var deferd = $q.defer();

                that.language_bundle = [];
                var found = $filter('filter')(response.included, {
                    id: "" + response.data.attributes["language-id"],
                    type: "languages"
                }, true);
                if (found.length > 0) {
                    that.language_bundle.push(found[0]);
                    that.model.data.attributes['language-id'] = '' + that.model.data.attributes['language-id'];
                }

                deferd.resolve(that.language_bundle);
                return deferd.promise;
            });


            $scope.languagesArr = [];

            $scope.languagesArrFn = function (query, querySelectAs) {
                var deferd = $q.defer();

                $scope.languages = Resources.languages.get({
                    'page[number]': 1,
                    'page[size]': 50,
                    'sort': 'en-name',
                    'filter[name]': query
                });

                $scope.languages.$promise.then(function (response) {
                    $scope.languagesArr = response;
                    var result = [];
                    angular.forEach(response.data, function (obj, key) {
                        result.push(obj);
                    });
                    deferd.resolve(result);
                });
                return deferd.promise;
            };


            /*Image upload and submit*/
            this.image = {};

            this.save = function () {
                var update_data = {};
                update_data.data = {};
                update_data.data.attributes = {};
                update_data.data.attributes["job-experience"] = that.model.data.attributes["job-experience"];
                update_data.data.attributes.education = that.model.data.attributes.education;
                //update_data.data.attributes["language-id"] = that.model.data.attributes["language-id"];

                //save data


                if (flow.next_data) {

                    var job_id = flow.next_data;
                    // UPLOAD USER IMAGE GET ONE-TOKEN
                    // UPDATE USER PROFILE + ONE-TOKEN
                    // UPDATE USER LANGUAGE SKILL
                    jobService.acceptJob(job_id);


                    /*$http.post(settings.just_match_api + settings.just_match_api_version + "jobs/" + job_id + "/users").success(function (data, status) {
                     console.log(data);
                     console.log(status);
                     flow.next(routes.job.accept.url, job_id);
                     }).error(function (data, status) {
                     //that.message = error;
                     //flow.reload(routes.user.user.url);
                     console.error('Repos error', status, data);
                     });*/

                }

                /*
                 // UPDATE USER PROFILE
                 Resources.users.update(update_data, function (response) {
                 console.log(response);
                 });
                 */
                /*
                 // UPLOAD IMAGE
                 Resources.userImage.upload({
                 image: $scope.vm.uploadme,
                 data: {
                 attributes: {
                 image: $scope.vm.uploadme
                 }
                 }
                 },
                 function (response) {
                 console.log("upload image");
                 console.log(response);
                 }
                 );

                 */

            };
        }])
    .controller('UserJobsCtrl', ['userService', function (userService) {
        this.model = userService.userModel();
        this.message = userService.userMessage;

        console.log("company_id:" + userService.companyId());
    }]);
