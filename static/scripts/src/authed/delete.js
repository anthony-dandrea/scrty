$(function() {
    // Custom init event triggered after
    // table populated
    $('body').on('init', function() {
        $('[data-delete-pass]').on('click', function(e) {
            e.preventDefault();
            var app = $(this).attr('data-app');
            delete localStorage[app];
            $(this).closest('tr').slideUp().remove();
        });
    });
});
