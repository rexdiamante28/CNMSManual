ToggleElement = function(ids){
    var id ="";
    for(var a = 0; a<ids.length; a++){
        id = '#'+ids[a];
        $(id).toggle();
    }
}

SpinnerHide = function(){
    $('.spinner-container').hide();
}

SpinnerShow = function(){
    $('.spinner-container').show();
}

ClickNow = function(id){
    $(id).click();
}
