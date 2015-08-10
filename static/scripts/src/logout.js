$(function() {

    // Logout function
    function logout() {
        $.getJSON('/logout', function(data) {
            if (data.response == true) {
                // Reload page with ended session
                // will redirect to /login
                location.reload();
            } else {
                alert('Error: Logout failure.')
            }
        })
        .fail(function() {
            alert('Error: Server error while logging out.')
        });
    }

    // Event listener
    $('#logout').on('click', function(e) {
        e.preventDefault();
        logout();
    });
});