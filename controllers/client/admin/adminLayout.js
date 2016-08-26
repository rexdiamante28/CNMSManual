Template.adminLayout.events({
    'click .logout': function(event){
        Meteor.logout(function(error,result){
            if(error){

            }
            else{
                window.location = "/";
            }
        });
    }
})

Template.adminLayout.helpers({
    user: function(){
        return Meteor.user();
    }
})