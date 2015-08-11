$(function() {
    // Populates table with existing apps/pass
    // from localstorage on load
    var template = $('#passtemplate').html();
    $.each(localStorage, function(idx) {
        var markup = template;
        markup = markup.replace(/appName/g, idx);
        $('tr').first().after(markup);
        // Trigger init for table event listeners
        $('body').trigger('init');
    });
});
