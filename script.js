

angular.module('userdisplayDirective', [])
.controller('userdisplayDirectiveControllerMain', ['$scope', '$http','API', function($scope, $http, API) {

  // user rest api constant
  var userApiEndPoint = $scope.userApiEndPoint;
  $scope.loading = true;

  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    if($scope.userId===""){
      $scope.showFlag = "none";
      return;
    }

    $http.get(userApiEndPoint).success(function(response) {
      if(response!=null)
      {
        $scope.userModel = response;
        $scope.userId = response._id;
        $scope.showFlag = "user";
        $scope.loading = false;
      }
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
      else
        console.log("error with userView directive");
    });
  }

}])

.directive('userdisplay', function() {
  return {
    controller: 'userdisplayDirectiveControllerMain',
    templateUrl: '/userDisplay/templates/userdisplay.html',
    scope: {
      // userId: "=userId",
      viewMode: "=viewMode",
      userApiEndPoint: "=userApiEndPoint"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewMode.toLowerCase();

        if(viewmode === "nameonly"){
          return "/public/d/userDisplay/templates/nameOnlyPanel.html";
        }
        if(viewmode === "credonly"){
          return "/public/d/userDisplay/templates/credScore.html";
        }
        if(viewmode === "summaryonly"){
          return "/public/d/userDisplay/templates/summaryOnlyPanel.html";
        }

        if(viewmode === "bulletsmallonly"){
          return "/public/d/userDisplay/templates/bulletSmallOnlyPanel.html";
        }

        if(viewmode === "bulletmediumonly"){
          return "/public/d/userDisplay/templates/bulletMediumOnlyPanel.html";
        }

        if(viewmode === "emailonly"){
          return "/public/d/userDisplay/templates/emailOnlyPanel.html";
        }

        if(viewmode === "small")
        {
          return "/public/d/userDisplay/templates/smallpanel.html";
        }

        if(viewmode === "large")
        {
          return "/public/d/userDisplay/templates/largepanel.html";
        }

        if(viewmode === "medium")
        {
          return "/public/d/userDisplay/templates/mediumpanel.html";
        }
      }
    }
  };
});
