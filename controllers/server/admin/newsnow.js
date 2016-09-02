if(Meteor.isServer){
    Meteor.methods({
        'updateRatings': function(newsId,ratingsId){
            News.update({_id:newsId},{
                $set:{
                    ratingId: ratingsId
                }
            });
        },
        'updateComment': function(newsId,comment){
            News.update({_id:newsId},{
                $set:{
                    comments: comment
                }
            });
        },

        'getComment': function(newsId){
            console.log(News.findOne({_id:newsId}).comments);
            return News.findOne({_id:newsId}).comments;
        }
    })
}