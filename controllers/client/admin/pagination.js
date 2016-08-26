if(Meteor.isClient){
    Template.pagination.onCreated(function(){
        Names = new Mongo.Collection(null);

        Names.insert({
            name: "Rex"
        })
    })

    Template.pagination.helpers({
        'Allnames': function(){
            return Names.find({});
        }
    })
}