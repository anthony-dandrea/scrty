$(function() {

    // Case where login is successful
    function loginSuccess() {
        // Go to index now we have a session
        window.location = '/';
    }

    // Case where login failed
    function loginFail() {
        alert('Error: Login failed.')
    }

    // Check if user is authorized successfully
    function checkAuth() {
        $.getJSON('/isauthorized', function(data) {
            if (data.response == true) {
                loginSuccess();
            } else {
                loginFail();
            }
        })
        .fail(function() {
            alert('Error: Auth error.')
        });
    }

    // Poll to check for login response
    function poll() {
        $.getJSON('/poll', function(data) {
            if (data.response == true) {
                checkAuth();
            } else {
                // Waiting for user response
                // Check again after 5 seconds
                setTimeout(function(){
                    poll();
                }, 5000);
            }
        })
        .fail(function() {
            alert('Error: Login error.')
        });
    }

    // Login form event handler
    $('#login').on('submit', function(e) {
        e.preventDefault();
        var $self = $(this),
        formData  = $self.serialize();
        console.log(formData);
        $.post('/login', formData, function(data) {
            if (data.response == true) {
                poll();
            } else {
                alert('Error: User not found');
            }
        })
        .fail(function() {
            alert('Error: Make sure your username is enabled and correct.');
        });
    });

});
