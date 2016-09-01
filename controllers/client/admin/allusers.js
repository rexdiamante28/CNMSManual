Template.allusers.helpers({
    users: function(){
        return Accounts.users.find({});
    }
})