function loadStyleSheet(src) {
    if (document.createStyleSheet) {
        document.createStyleSheet(src);
    } else {
        $("head").append($("<link rel='stylesheet' href='" + src + "' type='text/css' media='screen' />"));
    }
};
$(document).ready(function() {
    loadStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,400i,500,600,700%7CMerriweather:300,300i');
});