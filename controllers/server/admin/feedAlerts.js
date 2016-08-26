if(Meteor.isServer){
    Meteor.methods({
        'alertStatusChange': function(status,id){
            Alerts.update({_id:Alerts.findOne({alertId:id})._id},{$set:{status:status}});
        },
        'getRssAlerts': function(rssLinkId,status,skip,limit,search){
            console.log(rssLinkId+" "+status+" "+skip+" "+limit+" "+search);
            if(search==""){
                return Alerts.find({status:status,rssId: rssLinkId}, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }
            else{
                return Alerts.find({status:status,title:search,rssId: rssLinkId}, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }

        },
        'getAlertsPages': function(rssLinkId,status,limit,search){
            console.log(rssLinkId+" "+status+" "+limit+" "+search);
            if(search==""){
                var unrounded = Alerts.find({status:status, rssId: rssLinkId},{_id:1}).count()/limit;
                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }
            else{
                var unrounded = Alerts.find({status:status,title:search, rssId: rssLinkId},{_id:1}).count()/limit;
                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }

        },
        'logAction': function(alertId,action){
            var userId = Meteor.userId();
            var timestamp = Date.now();


            ActionLogs.insert({
                alertId: alertId,
                userId: userId,
                name: Accounts.users.findOne({_id: userId}).profile.name,
                action: action,
                timestamp: timestamp
            });
        }
    })
}