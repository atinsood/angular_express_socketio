'use strict';

angular.module('socketioApp')
    .controller('MainCtrl', function ($scope, socketService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        socketService.on('init', function (data) {
            console.log('Socket was intialized');
        });

        socketService.on('respond:message', function (message) {
            console.log('Client received the response message from server');
        });


        $scope.sendMessage = function () {
            console.log("Sending message to server");
            socketService.emit('send:message', {
                user: 'Bob'
            });
        };
    });
