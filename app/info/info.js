const { remote } = require('electron');
const shell = require('electron').shell;
var $ = global.jQuery = require('../../static/plugins/jquery/jquery-3.4.1.min');

$( document ).ready(function() {
    // Set the version
    $('#version').text(remote.app.getVersion());

    // Set the web URL
    $('#url').text('https://www.tyler-wright.com/AppleCIDR')
    $('#url').attr('href', 'https://www.tyler-wright.com/AppleCIDR')

    // Set the author
    $('#author').text('Tyler Wright')
});


// Prevent links from opening in AppleCIDR
// Use user's default browser instead
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});