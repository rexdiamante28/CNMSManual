//global functions for rssLinks
ReloadRssLinks = function(skip,limit,search){
    SpinnerShow();
    Meteor.call('getRssLink',skip,limit,search,function(error,result){
        cRssLinks.remove({});
        for(var a =0; a< result.length; a++){
            cRssLinks.insert({
                link: result[a].link,
                keyword: result[a].keyword,
                status: result[a].status,
                createdByName: result[a].createdByName,
                assignedToName: result[a].assignedToName,
                createdAt: result[a].createdAt
            })
        }

        SpinnerHide();
    });
}

ReloadPages= function(limit,currentPage,search){
    Pages = Meteor.call('getRssPages',limit,search,function(error,result){
        if(error){}
        else{
            $('#actualPage').html(currentPage);
            $('#totalPage').html(result);
        }
    });
}

ReloadUnprocessedAlerts = function(){
    Meteor.call('getUnprocessedAlertsCount',function(error,result){
        if(error){}
        else{

        }
    });
}

if(Meteor.isClient){
    Template.rssLinks.onCreated(function(){
        cRssLinks = new Mongo.Collection(null);
        currentPage = 1;
        limit = 10;
        skipCount = (currentPage - 1) * limit;
        search = "";
    })

    Template.rssLinks.onRendered(function(){
        ReloadRssLinks(skipCount,limit,search);
        ReloadPages(limit,currentPage,search);
    })

    Template.rssLinks.helpers({
        'rssLinks': function () {
            return cRssLinks.find({});
        },
        'Pages': function(){
            return Pages;
        },
        'users': function(){
           return Accounts.users.find({});
        }
    })

    Template.rssLinks.events({
        'submit #rssLinkForm': function (event, template) {
            event.preventDefault();

            var rssLink = {
                keyword: template.find('#keyword').value,
                link: template.find('#link').value,
                assignedTo: template.find('#user').value
            }

            Meteor.call('insertRssLink',rssLink,function(error,result){
                if(error){
                    console.log(error);
                }
                if(result.status==true){
                    alertify.success(result.message);
                    $('#rssLinkForm')[0].reset();

                    ReloadRssLinks(skipCount,limit,search);
                    ReloadPages(limit,currentPage,search);
                }
                else{
                    alertify.error(result.message);
                }
            })
        },
        'submit #searchForm':function(event,template){
            event.preventDefault();
            search = template.find('#searchInput').value;
            currentPage =1;

            ReloadRssLinks(skipCount,limit,search);
            ReloadPages(limit,currentPage,search);
        },
        'change #recordLimit': function(event,template){
            limit = parseInt(template.find('#recordLimit').value);
            skipCount = (currentPage - 1) * limit;

            ReloadRssLinks(skipCount,limit,search);
            ReloadPages(limit,currentPage,search);
        },
        'click .statusButton': function(event){
                var id = event.currentTarget.id;
                Meteor.call('toggleRssStatus',event.currentTarget.id,function(error,result){
                    if(error){}
                    else{
                        var link =  cRssLinks.findOne({link:id});
                        if(link.status=="active"){
                            cRssLinks.update({_id:link._id},{$set:{status: "inactive"}});
                        }
                        else{
                            cRssLinks.update({_id:link._id},{$set:{status: "active"}});
                        }
                    }
                });
        },
        'click .deleteButton': function(event){
            var id = event.currentTarget.id;
            alertify.confirm('Confirm Action','Are you sure you want to delete this link?',function(){Meteor.call('deleteRssLink',event.currentTarget.id,function(error,result){
                if(error){}
                else{
                    cRssLinks.remove({link:id});
                }
            })},null);
        },
        'click #prevPage': function(){
            if(currentPage>0){
                currentPage--;
                if(currentPage==0){currentPage++;}
                skipCount = (currentPage - 1) * limit;
            }
            ReloadRssLinks(skipCount,limit,search);
            ReloadPages(limit,currentPage,search);
        },
        'click #nextPage': function(){
            currentPage++;
            skipCount = (currentPage - 1) * limit;
            ReloadRssLinks(skipCount,limit,search);
            ReloadPages(limit,currentPage,search);
        },
        'click .viewButton': function(event){
            SpinnerShow();
            sessionStorage.setItem('latestAlertViewed',event.currentTarget.id);
            Router.go('/user/alerts/feedAlerts');
        }
    })
}