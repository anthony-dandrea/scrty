$(function() {

    // Check if user has been logged out
    // on LK mobile app
    function checkAuth() {
        $.getJSON('/remote-logout', function(data) {
            if (data.response == false) {
                window.location = '/login';
            }
        })
        .fail(function(error) {
            // logged out on error
            window.location = '/login';
        });
        // Continues to check every 3 seconds
        setTimeout(function(){
            checkAuth();
        }, 3000);
    }
    checkAuth();

});
