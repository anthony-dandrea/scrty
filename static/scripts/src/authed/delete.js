$(function() {
    // Delete table row
    $(document).on('click', '[data-delete-pass]', function(e) {
        e.preventDefault();
        var app = $(this).attr('data-app');
        delete localStorage[app];
        $(this).closest('tr').slideUp().remove();
    });
});
