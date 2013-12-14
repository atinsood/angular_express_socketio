'use strict';

angular.module('socketioApp')
    .controller('MainCtrl', function ($scope, socketService) {

        $scope.usrmsg = '';
        //$scope.messages = [username :'', text:''];
        $scope.messages = [];
        $scope.users = [];

        socketService.on('init', function (usr) {
            console.log('user joined the chat room');
            $scope.users.push(usr);

        });

        socketService.on('respond:message', function (message) {
            console.log('Client received the response message from server '
                + message.username + " and text " + message.text);
            $scope.messages.push(message);
        });


        $scope.sendMessage = function () {
            console.log("Sending message to server " + $scope.users[0]['username']);
            socketService.emit('send:message', {
                username: $scope.users[0]['username'],
                text: $scope.usrmsg
                //username: 'a',
                //text: "hello from " + "a"
            });
        };
    })
;
