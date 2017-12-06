

angular.module('userdisplayDirective', [])
.controller('userdisplayDirectiveControllerMain', ['$scope', '$http','API', function($scope, $http, API) {

  console.log("in side the directive")
  // user rest api constant
  var userApiEndPoint = $scope.userApiEndPoint;
  $scope.loading = true;
  console.log("*****************************")
  console.log(userApiEndPoint)
  console.log("*****************************")
  // console.log("*****************************")
  // console.log($scope.userModel)
  // console.log("*****************************")

  // if($scope.userModel === undefined || $scope.userModel === "")
  //   $scope.showFlag = "none";
  // else
  //   $scope.showFlag = "user";

  $scope.getUser = function(){
    console.log("*****************************")
    console.log("inside get user function")
    console.log("*****************************")

    // if($scope.userId===""){
    //   $scope.showFlag = "none";
    //   return;
    // }

    $http.get(userApiEndPoint).success(function(response) {
     console.log("*****************************")
     console.log("response 33")
     console.log(response);

     console.log("*****************************")
     if(response!=null)
     {
      console.log("*****************************")
      console.log("after get http user details")
      console.log(response);
      console.log("*****************************")
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
    console.log("*****************************")
    console.log($scope.showFlag)
    console.log("*****************************")
  }

}])

.directive('userdisplay', function() {
  return {
    controller: 'userdisplayDirectiveControllerMain',
    templateUrl: 'templates/userdisplay.html',
    scope: {
      // userId: "=userId",
      viewMode: "=viewMode",
      userApiEndPoint: "=userApiEndPoint"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewMode.toLowerCase();
        console.log("*****************************")
        console.log("get template viewmode")
        console.log(viewmode);
        console.log("*****************************")
        if(viewmode === "nameonly"){
          console.log("*****************************")
          console.log("template:templates/nameOnlyPanel.html")
          console.log("*****************************")
          return "templates/nameOnlyPanel.html";
        }
        if(viewmode === "credonly"){
          console.log("*****************************")
          console.log("template:templates/credScore.html")
          console.log("*****************************")
          return "templates/credScore.html";
        }
        if(viewmode === "summaryonly"){
          console.log("*****************************")
          console.log("template:templates/summaryOnlyPanel.html")
          console.log("*****************************")
          return "templates/summaryOnlyPanel.html";
        }

        if(viewmode === "bulletsmallonly"){
          console.log("*****************************")
          console.log("template:templates/bulletSmallOnlyPanel.html")
          console.log("*****************************")
          return "templates/bulletSmallOnlyPanel.html";
        }

        if(viewmode === "bulletmediumonly"){
          console.log("*****************************")
          console.log("template:templates/bulletMediumOnlyPanel.html")
          console.log("*****************************")
          return "templates/bulletMediumOnlyPanel.html";
        }

        if(viewmode === "emailonly"){
          console.log("*****************************")
          console.log("template:templates/emailOnlyPanel.html")
          console.log("*****************************")
          return "templates/emailOnlyPanel.html";
        }

        if(viewmode === "small")
        {
          console.log("*****************************")
          console.log("template:templates/smallpanel.html")
          console.log("*****************************")
          return "templates/smallpanel.html";
        }

        if(viewmode === "large")
        {
          console.log("*****************************")
          console.log("template:templates/largepanel.html")
          console.log("*****************************")
          return "templates/largepanel.html";
        }

        if(viewmode === "medium")
        {
          console.log("*****************************")
          console.log("template:templates/mediumpanel.html")
          console.log("*****************************")
          return "templates/mediumpanel.html";
        }
      }
    }
  };
});
