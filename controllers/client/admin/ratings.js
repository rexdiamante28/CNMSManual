Template.ratings.helpers({
    ratings: function(){
       return Ratings.find({});
    }
})

Template.ratings.events({
    'click .remove': function(event){
        Ratings.remove({_id:event.currentTarget.id});
    }
})

Template.editratings.helpers({
    doc:function(){
        return Ratings.findOne({_id:P_ratingId});
    }
})