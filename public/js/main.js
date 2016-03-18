
var mainApp = angular.module("Mainapp", ['ngRoute','datatables','firebase','checklist-model']);
 mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/test', {
            templateUrl: "tes.ejs",
			controller :'test'
		})
 });

mainApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                 
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
		mainApp.service('fileUpload', ['$http', function ($http,$scope) {
    this.uploadFileToUrl = function(judul,event,foto,uploadUrl){
        var fd = new FormData();
        fd.append('foto', foto);
        fd.append('judul', judul);
        fd.append('event', event);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
			alert("sukses");
			$http.get("lihat_event").success(function(data){
		eve = data;
			});
			
        })
        .error(function(){
				alert("data gagal di input");
        });
		
    }
	
}]);
mainApp.controller("test",function($scope,$http){
$scope.dtOptions = DTOptionsBuilder.newOptions()
       
		.withDisplayLength(5)
        .withOption('bLengthChange', false)
        .withOption('autoWidth', false)
        .withOption('scrollX', false);
		
});	