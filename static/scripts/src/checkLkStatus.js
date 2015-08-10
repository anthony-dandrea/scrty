/*
Currently not working. Need to find out
how to deorbit from phone.

$(function() {

    // Check if user has been logged out
    // on LK mobile app
    function checkAuth() {
        $.getJSON('/isauthorized', function(data) {
            console.log(data);
        })
        .fail(function(error) {
            // logged out
            if (error.status == 403) {
                window.location = '/login';
            } else {
                console.log(error);
            }
        });
        // Continues to check every 3 seconds
        setTimeout(function(){
            checkAuth();
        }, 3000);
    }
    checkAuth();

});
*/