// ==UserScript==
// @name         OldRedditrect
// @namespace    Oldreddit
// @version      1.0
// @description  Redirects reddit.com links to old.reddit.com links
// @author       Hal47
// @match        *://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=www.reddit.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

function test(url){
    return !!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/.*|$)/gim);
}

function getNewPagePlease(url){
    return 'https://old.reddit.com' + url.split('reddit.com').pop();
}

function fixRedditStuff(){
    var links = Array.prototype.slice.call(document.links, 0);
    links.filter(function(link){
        if(test(link.href)){
            var greatNewLink = getNewPagePlease(link.href);
            if(link.hasAttribute('data-outbound-url')) link.setAttribute('data-outbound-url', greatNewLink);
            link.setAttribute('href', greatNewLink);
        }
    });
}

if(test(window.location.href)){window.location.assign(getNewPagePlease(window.location.href));}

window.onload = fixRedditStuff;
setInterval(fixRedditStuff, 50);
