window.onload = function(){
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let date = (new Date(Date.now() - tzoffset)).toISOString().substr(0, 10);
    window.location.replace(`/${date}`);
}