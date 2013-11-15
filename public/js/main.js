'user strict';

angular.module('NDeditor',['ui.ace','angularTreeview']);

angular.module("NDeditor").directive('draggable', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var options = scope.$eval(attrs.draggable); //allow options to be passed in
      elm.draggable(options);
    }
  };
}).directive('resizable', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var options = scope.$eval(attrs.resizable); //allow options to be passed in
      elm.resizable(options);
      if(attrs.resizableElement){
        scope[attrs.resizableElement]=elm;
      }
    }
  };
});

function MainCtrl($scope){

  $scope.treedata = 
    [
        { "label" : "User", "id" : "role1", "children" : [
            { "label" : "subUser1", "id" : "role11", "children" : [] },
            { "label" : "subUser2", "id" : "role12", "children" : [
                { "label" : "subUser2-1", "id" : "role121", "children" : [
                    { "label" : "subUser2-1-1", "id" : "role1211", "children" : [] },
                    { "label" : "subUser2-1-2", "id" : "role1212", "children" : [] }
                ]}
            ]}
        ]},
        { "label" : "Admin", "id" : "role2", "children" : [] },
        { "label" : "Guest", "id" : "role3", "children" : [] }
    ];   

  
  $scope.$watch('resizableelement',function(){
    $scope.resizableelement.on("resize",function(event,ui){
      $scope.aceeditor.resize();
    });
  });
};