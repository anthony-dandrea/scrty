$(function() {
    // Allow users to copypasta passworda
    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C/Cmd+C, Enter", text);
    }

    // Calls BE for uncryped password
    $(document).on('click', '[data-get-pass]', function(e) {
        e.preventDefault();
        var app = $(this).attr('data-app'),
            password = localStorage[app],
            csrf = $('[name="_csrf_token"]').val();
        $.post('/decrypt-password', {'password': password, '_csrf_token': csrf}, function(data) {
            if (data.success) {
                copyToClipboard(data.decrypted_password);
            } else {
                alert('Error: Unable to decrypt password.');
            }
        }).fail(function() {
            alert('Error: Server error.')
        });
    });
});
