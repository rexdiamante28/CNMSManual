if(Meteor.isServer){
    Meteor.publish('alertlogs',function(alertId){
        return ActionLogs.find({alertId: alertId});
    })

    Meteor.publish('categories',function(id){
        if(id===""){
            return  Categories.find({});
        }
        else{
            return Categories.find({_id:id});
        }
    })

    Meteor.publish('publications',function(id){
        if(id===""){
            return Publications.find({});
        }
        else{
            return Publications.find({_id:id});
        }
    })

    Meteor.publish('ratings',function(id){
        if(id===""){
            return Ratings.find({});
        }
        else{
            return Ratings.find({_id:id});
        }
    })

    Meteor.publish('profileimages',function(id){
        if(id===""){
            return ProfileImages.find({});
        }
        else {
            return ProfileImages.find({_id:id});
        }
    })

    Meteor.publish('news',function(id){
        if(id===""){
            return news.find({});
        }
        else{
            return News.find({_id:id});
        }
    })

    Meteor.publish('users',function(id){
        if(id===""){
            return Accounts.users.find({});
        }
        else{
            return Accounts.users.find({_id:id});
        }
    })

    Meteor.publish('news',function(){
        return News.find({});
    })
}