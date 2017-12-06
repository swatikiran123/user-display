

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
.directive('user', function($templateCache) {

  var TEMPLATE_URL_USERPICKER = '/userpicker/index.html';

  // Set the default template for this directive
  $templateCache.put(TEMPLATE_URL_USERPICKER,
      '<input type="text" name="user" id="user"  placeholder="User" ng-blur="getUser()" ng-model="userEmail" ng-minlength="1" ng-maxlength="75">'+
      '<br>'+
      '<ANY ng-switch="showFlag">'+
      '<ANY ng-switch-when="user">'+
          '<div ng-include = "getTemplate()"></div>'+
       '</ANY>'+
       '<ANY ng-switch-when="noUser">'+
          '<div class="text-danger" style="width:180px;!important;">'+
             'User not found!!!'+
          '</div>'+
       '</ANY>'+
       '<ANY ng-switch-default>'+
          '<div class="text-info" style="width:180px;!important;">'+
             '<!-- Default panel -->'+
          '</div>'+
       '</ANY>'+
    '</ANY>'
  );

  var TEMPLATE_URL_SMALLPANEL ='/userpicker/smallpanel.html';
  
  // Set the smallpanel template for this directive
  $templateCache.put(TEMPLATE_URL_SMALLPANEL,
    '<br>'+
    '<div class="panel  panel-default" class="panel-bg" >'+
      '<div class="panel-body">'+
        '<div class="pull-left">'+
          '<img src="bower_components/ng1UserPanel/src/images/default_male300x300-aae6ae0235b6cd78cee8df7ae19f6085.png" class="img-circle userpic">'+
        '</div>'+
      '<div class="panelpad">'+
        '<div class="text-highlight">{{userModel.name.first}} {{userModel.name.last}}</div>'+
        '<div class="text-xsmall">{{userModel.jobTitle}}</div>'+
        '<div class="text-xsmall">{{userModel.organization}}</div>'+
      '</div>'+
    '</div>'+
    '</div>'
  );

  var TEMPLATE_URL_MEDPANEL ='/userpicker/mediumpanel.html';
  
  // Set the smallpanel template for this directive
  $templateCache.put(TEMPLATE_URL_MEDPANEL,
      '<br>'+
      '<div class="panel panel-default">'+
         '<div class="panel-body">'+
            '<div class="pull-left">'+
               '<img src="bower_components/ng1UserPanel/src/images/default_male300x300-aae6ae0235b6cd78cee8df7ae19f6085.png" class="img-circle userpicmd"> '+
            '</div>'+
            '<div class="panelpdmd">'+
               '<div class="text-highlight">{{userModel.name.first}} {{userModel.name.last}}</div>'+
               '<div class="text-xsmall">{{userModel.email}}</div>'+
               '<div class="text-xsmall">{{userModel.jobTitle}}</div>'+
               '<div class="text-xsmall">{{userModel.organization}}</div>'+
            '</div>'+
         '</div>'+
      '</div>'+
      '</div>'
  );

  var TEMPLATE_URL_LARGEPANEL ='/userpicker/largepanel.html';
  
  // Set the smallpanel template for this directive
  $templateCache.put(TEMPLATE_URL_LARGEPANEL,
      '<br>'+
      '<div class="panel panel-default">'+
         '<div class="panel-body ">'+
            '<div class="pull-left">'+
               '<img src="bower_components/ng1UserPanel/src/images/default_male300x300-aae6ae0235b6cd78cee8df7ae19f6085.png" class="img-circle userpiclg"> '+
            '</div>'+
            '<div class="panelpdlg">'+
               '<div class="text-highlight">{{userModel.name.first}} {{userModel.name.last}}</div>'+
               '<div class="text-xsmall">{{userModel.email}}</div>'+
               '<div class="text-xsmall">{{userModel.jobTitle}}</div>'+
               '<div class="text-xsmall">{{userModel.organization}}</div>'+
               '<div class="text-desc">{{userModel.summary}}</div>'+
            '</div>'+
         '</div>'+
      '</div>'+
      '</div>'
  );
  return {
    controller: 'ng1UserPanelControllerMain',
    // templateUrl: 'templates/user-picker.html',
    scope: {
      userModel: '=userModel',
      userId: '=userId',
      userEmail: '=userEmail',
      viewType: '=viewType',
      switchMode: '=switchMode',
      userType: '@userType'
    },
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || TEMPLATE_URL_USERPICKER;
    },
    link : function(scope)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewType.toLowerCase();

        if(viewmode === 'small' && scope.userEmail!=='')
        {
          return TEMPLATE_URL_SMALLPANEL;
        }
        if(viewmode === 'large'){
          return TEMPLATE_URL_LARGEPANEL;
        }
        if(viewmode === 'medium'){
          return TEMPLATE_URL_MEDPANEL;
        }

      };
    }
  };
});