$(function() {
    $('#password_encrypt').on('submit', function(e) {
        e.preventDefault();
        var $self = $(this),
        formData  = $self.serialize();
        $.post('/encrypt-password', formData, function(data) {
            if (data.success) {
                var app = $self.find('[name="app"]').val(),
                    password = data.encrypted_password;
                setCookie(app, password);
                alert('Cookie set:\n'+app+'\n'+password);
            } else {
                alert('Something broke.');
            }
        })
        .fail(function() {
            alert('Something broke.');
        });
    });
});