if(Meteor.isClient){
    Template.alerts.helpers({
        'unsortedLinks': function(){
            return Alerts.find({});
        },
        'RssLinks': function(event){
            try{
                rssSumarry = new Mongo.Collection(null);

                var links = RSS.find({});
                var count = links.count();
                links = links.fetch();
                for(var a = 0; a<count; a++){
                    rssSumarry.insert({
                        rssId: links[a]._id,
                        keyword: links[a].keyword,
                        link: links[a].link,
                        unsorted: Alerts.find({status: "unsorted",rssId:links[a].link}).count(),
                        relevant: Alerts.find({status: "relevant",rssId:links[a].link}).count(),
                        irrelevant: Alerts.find({status: "irrelevant",rssId:links[a].link}).count(),
                        status:links[a].status
                    })
                }
                return rssSumarry.find({});
            }
            catch(ex){
                alert(ex.message);
            }
        }
    })

    Template.alerts.events({
        'click .view-alert-unsorted': function(event){
            Session.set('currentRssFeed',event.currentTarget.id);
            Session.set('currentRssFeedStatus',"unsorted");
            Router.go('/user/alerts/feedAlerts');
        },
        'click .view-alert-relevant': function(event){
            Session.set('currentRssFeed',event.currentTarget.id);
            Session.set('currentRssFeedStatus',"relevant");
            Router.go('/user/alerts/feedAlerts');
        },
        'click .view-alert-irrelevant': function(event){
            Session.set('currentRssFeed',event.currentTarget.id);
            Session.set('currentRssFeedStatus',"irrelevant");
            Router.go('/user/alerts/feedAlerts');
        }
    })
}    