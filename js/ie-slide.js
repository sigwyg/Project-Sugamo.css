
// -----------------------------
// ie-slide.js
// -----------------------------
// 
//  * for IE9 below
//  * a substitute for :target pseud-selector
//  
// -----------------------------


var slideFunc = function(navLinks,articles){
    if(!window.event) return false;
    
    var hash   = window.location.hash.substring(1);
    var target = document.getElementById(hash);
    
    for(var i=0;i<articles.length;i++){
        articles[i].style.width  = '0';
        articles[i].style.height = '0';
    }

    if (target){
        target.style.width  = '646px';
        target.style.height = 'auto';
    }

    event.returnValue = false;
}

var eventAdd = function(elm, evType, fn, useCapture){
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
    }
    else if (elm.attachEvent) {
        var IEfn = function(e){
            if(!e) e = window.event;
            e.currentTarget = elm;
            if(Function.prototype.call)
                fn.call(elm,e)
            else{
                elm._currentHandler = fn;
                elm._currentHandler(e);
                elm._currentHandler = null;
            }
        }
        var r = elm.attachEvent('on' + evType, fn);
        return r;
    }
    else {
        elm['on' + evType] = fn;
    }
}

eventAdd(window, 'load', function(){
    var navLinks = document.getElementsByTagName('header')[0]
                            .getElementsByTagName('nav')[0].getElementsByTagName('a');

    var articles = [];
    for(var i=0;i<navLinks.length;i++){
        articles.push(document.getElementById(navLinks[i].href.split('#')[1]));
    }

    // add Event
    for(var i=0;i<navLinks.length;i++){
        eventAdd(navLinks[i],'click',function(){ slideFunc(navLinks,articles) },false);
    }                        
    
    // load init
    var query = window.location.hash;
    if (!query){
        window.location = '#about';
        slideFunc(navLinks,articles);
        scrollTo(0,0);
    }

}, false);







