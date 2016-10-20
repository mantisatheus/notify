// Notification center v0.5

//

(function() {
'use strict';

    var notifyModule = angular.module('mantisNotify', []);

    notifyModule.provider('Notify',function() {

        this.notifications=[];

        this.create=function(name,obj,fn) {

            var newN=function() {
                var that=this;
                var notification=angular.copy(obj);
                notification.show=true;
                notification.timeout=notification.timeout || 6000;
                notification.template=notification.template || '';
                notification.text=notification.text || '';
                notification.close=function(id) {
                    that.notifications.splice(id,1);
                };
                if (typeof fn == 'function') {fn.apply(notification,arguments)};
                notification.delay=that.$timeout(function() { 
                    notification.show=false;
                },notification.timeout);
                that.notifications.push(notification);
                that.killOld();
            };

            this[name]=newN;
        };

        this.Clear=function() {
            this.notifications=[];
        };

        this.killOld=function() {
            if (this.notifications.length > this.maxLength) {
                this.notifications.shift();
            };    
        };

        this.$get=['$timeout',function($timeout) {
            this.$timeout=$timeout;
            return this;
        }];

    });

    notifyModule.directive('notifications',['Notify',function(Notify) {
        var dirDefObj={
            replace:true,
            template:
            '<div class="notifications">'+
                '<div class="notificationStack" ng-if="notifications.length">'+
                    '<div class="alert alert-success" role="alert" ng-repeat="(id,notification) in notifications" ng-include="notification.template" ng-if="notification.show">'+
                    '</div>'+
                '</div>'+
            '</div>',
            link: function ($scope, el, attrs) {
                $scope.notifications=Notify.notifications;
                Notify.maxLength=+attrs.max || 3;
            }
        };
        return dirDefObj;    
    }]);


}());

