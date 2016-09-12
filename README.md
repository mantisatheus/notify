Notification center v0.5

needs angularJs 1.4 or >


add: 
	mantis_notify.js, mantis-notify.css

add: 
	'<notifications max="3"></notifications>'

add: 

	'mantisNotify' in angular module	

configure example:

	myModule.config(['NotifyProvider', function(NotifyProvider) {

	    NotifyProvider.create('error',{template:'error.html'},function(text,time) {
	        this.text=text || 'some default error';
	        this.timeout=time || 10000;
	    });

	}]);

	-- this creates new notify type named 'error',

use example:

	Notify.error('some error',1000);

template example 'error.html':

	<a href="" role="button" ng-click="notification.close(id)">
	    close
	</a>

	<p>{{::notification.text}}</p>




