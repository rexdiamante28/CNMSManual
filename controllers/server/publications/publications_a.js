if(Meteor.isServer){
    Meteor.publish('alertlogs',function(alertId){
        return ActionLogs.find({alertId: alertId});
    })
}