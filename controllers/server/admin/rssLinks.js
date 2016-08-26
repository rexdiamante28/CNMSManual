if(Meteor.isServer){
    Meteor.methods({
        'getRssLink': function(skip,limit,search){
            if(search==""){
                return RSS.find({}, {
                    sort:{'createdAt': -1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }
            else{
                return RSS.find({$or:[
                    {'keyword':search},
                    {'status':search},
                    {'createdBy':search}
                ]}, {
                    sort:{'createdAt': -1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }
        },
        'getRssPages': function(limit,search){
            if(search==""){
                var unrounded = RSS.find({}).count()/limit;
                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }
            else{
                var unrounded = RSS.find({$or:[
                        {'keyword':search},
                        {'status':search},
                        {'createdBy':search}
                    ]}).count()/limit;
                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }
        },
        'insertRssLink':function(rssLink){

            var status = true;
            var message = "successfully added new RSS Link";

            if(RSS.find({link:rssLink.link}).count()>0){
                status = false;
                message = "Link already exists";
            }else{
                RSS.insert({
                    keyword: rssLink.keyword,
                    link: rssLink.link,
                    status: "inactive",
                    createdBy: Meteor.userId(),
                    createdByName:Meteor.user().profile.name,
                    assignedTo: rssLink.assignedTo,
                    assignedToName:Accounts.users.findOne({_id:rssLink.assignedTo}).profile.name,
                    createdAt: new Date()

                },function(error,result){
                    if(error!=null){
                        status = false;
                        message = "";
                        for(a=0;a<error.invalidKeys.length;a++)
                        {
                            message+= "&bull;&nbsp;&nbsp;"+RSS.simpleSchema().namedContext().keyErrorMessage(error.invalidKeys[a].name)+"<br/>";
                        }
                    }
                })
            }

            var result = {
                status: status,
                message: message
            }

            return result;

        },
        'toggleRssStatus': function(rssLink){
            var link =  RSS.findOne({link:rssLink});
            if(link.status=="active"){
                RSS.update({_id:link._id},{$set:{status: "inactive"}});
            }
            else{
                RSS.update({_id:link._id},{$set:{status: "active"}});
            }
        },
        'deleteRssLink': function(rssLink){
            RSS.remove({link:rssLink});
        }
    })
}