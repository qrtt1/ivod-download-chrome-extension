
function createDownloadButton(uri) {
    var ivodHandler = $("<a></a>")
        .addClass('ivod-dl-helper-handled')
        .attr('href', '#')
        .attr('target', 'ivod-handler')
        .text("排程下載")
        .click(function(event){
            event.preventDefault();
            chrome.runtime.sendMessage(uri);
        })
        ;
    return ivodHandler
}

function isNonVODUrl(linkElement) {
    var uri = $(linkElement).attr('href');
    if (typeof uri !== typeof undefined) {
        return !uri.match(/\/Play\/VOD.*/)
    }
    return true;
}

function hasVODHandler(linkElement) {
    return $(linkElement).hasClass('ivod-dl-helper-handled');
}

function buildScheduleLink(linkElement) {
    var link = $(linkElement);
    var href = link.attr('href');
    link.addClass('ivod-dl-helper-handled');
    link.parent().parent()
        .before($(createDownloadButton(href)));
}

function attachDownloadHelper(elem) {
    if (isNonVODUrl(elem) || hasVODHandler(elem)) {
        return ;
    }

    buildScheduleLink(elem);
}

$('.list').bind('DOMNodeInserted', function(e) {
    $.each($(".list a"), function(idx, elem){
        attachDownloadHelper(elem);
    });
});
