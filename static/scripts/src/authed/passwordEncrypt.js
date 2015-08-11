$(function() {

    // Get html template and populate with new password
    function addNew(app) {
        var template = $('#passtemplate').html();
        template = template.replace(/appName/g, app);
        $('tr').first().after(template);
        // Fire init for another table elem
        $('body').trigger('init');
    }

    // Asks backend for password encryption
    // Stores in localStorage
    $('#password_encrypt').on('submit', function(e) {
        e.preventDefault();
        // Check if app already exists to not overwrite
        var app = $('#app').val();
        if (!localStorage[app]) {
            var $self = $(this),
            formData  = $self.serialize();
            $.post('/encrypt-password', formData, function(data) {
                if (data.success) {
                    var password = data.encrypted_password;
                    localStorage.setItem(app, password);
                    addNew(app);
                } else {
                    alert('Error: Unable to encrypt and save password.');
                }
            })
            .fail(function() {
                alert('Error: Server error.');
            });
        } else {
            alert('Pick a new app/site or delete existing first.')
        }

    });

});
