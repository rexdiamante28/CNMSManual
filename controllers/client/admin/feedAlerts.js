ReloadAlerts = function(rssLinkId,status,skip,limit,search){
    SpinnerShow();
    Meteor.call('getRssAlerts',rssLinkId,status,skip,limit,search,function(error,result){
        cAlerts.remove({});
        if(error){alert(error.message)}
        else{
            for(var a =0; a< result.length; a++){
                cAlerts.insert({
                    rssId: result[a].rssId,
                    alertId: result[a].alertId,
                    link: result[a].link,
                    title: result[a].title,
                    published: result[a].published,
                    updated: result[a].updated,
                    inserted: result[a].inserted,
                    viewed: result[a].viewed,
                    viewedBy: result[a].viewedBy,
                    status: result[a].status
                })
            }
            SpinnerHide();
        }
    });
}

ReloadAlertsPages= function(rssLinkId,status,limit,currentPage,search){
    Meteor.call('getAlertsPages',rssLinkId,status,limit,search,function(error,result){
        if(error){}
        else{
            $('#actualPage').html(currentPage);
            $('#totalPage').html(result);
        }
    });
}

ManageFilterButtons = function(status){
    if(status=="unsorted"){
        $('#filter-unsorted').attr('disabled',true);
        $('#filter-relevant-positive').attr('disabled',false);
        $('#filter-relevant-negative').attr('disabled',false);
        $('#filter-irrelevant').attr('disabled',false);
    }else if(status=="relevant-positive"){
        $('#filter-unsorted').attr('disabled',false);
        $('#filter-relevant-positive').attr('disabled',true);
        $('#filter-relevant-negative').attr('disabled',false);
        $('#filter-irrelevant').attr('disabled',false);
    }else if(status=="relevant-negative"){
        $('#filter-unsorted').attr('disabled',false);
        $('#filter-relevant-positive').attr('disabled',false);
        $('#filter-relevant-negative').attr('disabled',true);
        $('#filter-irrelevant').attr('disabled',false);
    }else if(status=="irrelevant"){
        $('#filter-unsorted').attr('disabled',false);
        $('#filter-relevant-positive').attr('disabled',false);
        $('#filter-relevant-negative').attr('disabled',false);
        $('#filter-irrelevant').attr('disabled',true);
    }
}

if(Meteor.isClient){
    Template.feedAlerts.onCreated(function(){
        cAlerts = new Mongo.Collection(null);
        currentPage = 1;
        limit = 10;
        skipCount = (currentPage - 1) * limit;
        status = "unsorted";
        search = "";
        rssLinkId = sessionStorage.getItem('latestAlertViewed')
    })

    Template.feedAlerts.onRendered(function(){
        ReloadAlerts(rssLinkId,status,skipCount,limit,search);
        ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
        ManageFilterButtons(status);

    })


    Template.feedAlerts.helpers({
        'Alerts': function(){
            return cAlerts.find({});
        }
    })


    Template.feedAlerts.events({
        'submit #searchForm':function(event,template){
            event.preventDefault();
            search = template.find('#searchInput').value;
            currentPage =1;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'change #recordLimit': function(event,template){
            limit = parseInt(template.find('#recordLimit').value);
            skipCount = (currentPage - 1) * limit;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'click #prevPage': function(){
            if(currentPage>0){
                currentPage--;
                if(currentPage==0){currentPage++;}
                skipCount = (currentPage - 1) * limit;
            }
            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
        },
        'click #nextPage': function(){
            currentPage++;
            skipCount = (currentPage - 1) * limit;
            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
        },
        'click #filter-unsorted': function(){
            status = "unsorted";
            currentPage=1;
            skipCount = (currentPage - 1) * limit;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'click #filter-relevant-positive': function(){
            status = "relevant-positive";
            currentPage=1;
            skipCount = (currentPage - 1) * limit;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'click #filter-relevant-negative': function(){
            status = "relevant-negative";
            currentPage=1;
            skipCount = (currentPage - 1) * limit;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'click #filter-irrelevant': function(){
            status = "irrelevant";
            currentPage=1;
            skipCount = (currentPage - 1) * limit;

            ReloadAlerts(rssLinkId,status,skipCount,limit,search);
            ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
            ManageFilterButtons(status);
        },
        'click .relevant-positive-button': function(event){
            Meteor.call('alertStatusChange',"relevant-positive",event.currentTarget.id,function(error,result){
                if(error){console.log(error.message);}
                else{
                    Meteor.call('logAction',event.currentTarget.id,"Set article status to RELEVANT-POSITIVE");
                    ReloadAlerts(rssLinkId,status,skipCount,limit,search);
                    ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
                }
            });
        },
        'click .relevant-negative-button': function(event){
            Meteor.call('alertStatusChange',"relevant-negative",event.currentTarget.id,function(error,result){
                if(error){console.log(error.message);}
                else{
                    Meteor.call('logAction',event.currentTarget.id,"Set article status to RELEVANT-NEGATIVE");
                    ReloadAlerts(rssLinkId,status,skipCount,limit,search);
                    ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
                }
            });
        },
        'click .irrelevant-button': function(event){
            Meteor.call('alertStatusChange',"irrelevant",event.currentTarget.id,function(error,result){
                if(error){console.log(error.message);}
                else{
                    Meteor.call('logAction',event.currentTarget.id,"Set article status to IRRELEVANT");
                    ReloadAlerts(rssLinkId,status,skipCount,limit,search);
                    ReloadAlertsPages(rssLinkId,status,limit,currentPage,search);
                }
            });
        },
        'click .alert-link': function(event){
            Meteor.call('logAction',event.currentTarget.id,"Read the article.");
        },
        'click .logs': function(event){
            sessionStorage.setItem('currentalertlogsid',event.currentTarget.id);
        }
    })
}