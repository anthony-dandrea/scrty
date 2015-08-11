$(function() {

    // Allow users to copypasta passworda
    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C/Cmd+C, Enter", text);
    }


    // WIP
    // Calls BE for uncryped password
    $('[data-get-pass]').on('click', function(e) {
        e.preventDefault();
        alert('WIP');
    });

});
