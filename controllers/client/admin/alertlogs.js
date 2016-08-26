Template.alertLogs.helpers({
    'logs': function(){
       return ActionLogs.find({alertId: sessionStorage.getItem('currentalertlogsid')});
    }
})
