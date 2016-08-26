MS2M = function(ms){
    return Math.round(((ms/1000)/60));
}
ReloadMonitoring = function(){
    SpinnerShow();
    Meteor.call('fetchUpdateSummary',function(error,result){
        if(error){console.log(error.message())}
        else{
            $('#newAlerts').html(result.alerts);
            if(result.alerts>1000000){
                $('#newAlerts').attr("class","large-numbers-3");
            }
            $('#emoticon').attr({"src": PickEmoticon(result.alerts)});
            $('#nextUpdate').html(MS2M(result.fetchingIn));
            $('#lastFetchedNumber').html(result.lastFetchedNumber);
            $('#fetchedToday').html(result.fetchedToday);
            if(result.fetchedToday>999){
                $('#fetchedToday').attr("class","large-numbers-4");
            }
        }
        SpinnerHide();
    });
}

PickEmoticon = function(number){
    if(number<=50){
        return "/Images/emoticons/smile.png";
    }
    else if(number>=51 && number<=100)
    {
        return "/Images/emoticons/slightly-angry.png";
    }
    else if(number>100)
    {
        return "/Images/emoticons/angry.png"
    }
}

if(Meteor.isClient){
    Template.monitoring.onCreated(function(){
        ReloadMonitoring();
    })

    Template.monitoring.onRendered(function(){
        function flashtext(ele,col) {
            var tmpColCheck = document.getElementById( ele ).style.color;

            if (tmpColCheck === 'white') {
                document.getElementById( ele ).style.color = col;
                $('.blink').css({"color":"red"});
            } else {
                document.getElementById( ele ).style.color = 'white';
                $('.blink').css({"color":"white"});
            }
        }

        setInterval(function() {
            flashtext('newAlerts','red');
        }, 1000 );

         setInterval(function(){
            ReloadMonitoring();
        },10000);

    })

}