$.ajaxPrefilter(function(option){
    console.log(option.url);
    console.log('http://www.liulongbin.top:3007');
    
    option.url = 'http://www.liulongbin.top:3007' + option.url
    
})