

angular.module('userdisplayDirective', [])
.controller('userdisplayDirectiveControllerMain', ['$scope', '$http','API', function($scope, $http, API) {
'use strict';

angular
.module('ng1UserPanel')
.controller('ng1UserPanelControllerMain', ['$scope', '$http', function($scope, $http) {

  // users and usersEmail rest api constants
  var userApiEndPoint = 'http://localhost:8080/api/v1/secure/admin/users/';
  var userEmailApiEndPoint = 'http://localhost:8080/api/v1/secure/admin/users/email/';

  if($scope.userModel === undefined || $scope.userModel === '')
  {
    $scope.showFlag = 'none';
  }
  else{
    $scope.showFlag = 'user';
  }

  $scope.getUser = function(){
    var url= '';
    if($scope.userId!=='' && $scope.userId!==undefined){
      url=userApiEndPoint + $scope.userId;
    }
    
    if ($scope.userEmail!=='' && $scope.userEmail!==undefined) {
      url=userEmailApiEndPoint + $scope.userEmail;
    }

    $http.get(url).success(function(response) {

      if(response){
        $scope.userModel = response;
        $scope.userId = response._id;
        $scope.userEmail = response.email;
        $scope.showFlag = 'user';
      }

      else{
        $scope.showFlag = 'noUser';
        $scope.message = 'User not found';
      }

    })
    .error(function(response, status){
      $scope.showFlag = 'noUser';
      if(status===404)
      {
        $scope.message = 'User not found';
      }
    });
  }; // end of getUser method
  
  if($scope.switchMode === 'edit')
  {  
    if($scope.userId)
    { 
      $scope.getUser(); // autoload data
    }
    $scope.showFlag = 'user';
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