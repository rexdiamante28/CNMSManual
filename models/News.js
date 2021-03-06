News = new Mongo.Collection('news');

News.after.insert(function (userId, doc) {
    if(doc._id!==undefined){
        if(doc.ratingId===undefined){
            console.log(doc.publicationId);
            News.update({_id:doc._id},{
                $set:{
                    publicationName: Publications.findOne({_id:doc.publicationId}).name,
                    categoryName: Categories.findOne({_id:doc.categoryId}).name,
                    reportedById: Meteor.userId(),
                    reportedBy: Meteor.user().profile.name,
                    inserted: new Date(),
                    isHeadline: Categories.findOne({_id:doc.categoryId}).isHeadline
                }
            });
        }
        else{
            News.update({_id:doc._id},{
                $set:{
                    publicationName: Publications.findOne({_id:doc.publicationId}).name,
                    categoryName: Categories.findOne({_id:doc.categoryId}).name,
                    rating: Ratings.findOne({_id:doc.ratingId}).name,
                    reportedById: Meteor.userId(),
                    reportedBy: Meteor.user().profile.name,
                    inserted: new Date(),
                    isHeadline: Categories.findOne({_id:doc.categoryId}).isHeadline
                }
            });
        }

    }
});

News.after.update(function (userId, doc, fieldNames, modifier, options) {
    if(userId!==doc.reportedById){
        News.update({_id:doc._id},{
            $set:{
                reportedBy:Meteor.user().profile.name,
                reportedById: Meteor.userId()
            }
        })
        console.log("updated");
    }
    if(doc.ratingId!==undefined){
        if(Ratings.findOne({_id:doc.ratingId}).name!==doc.rating){
            News.update({_id:doc._id},{
                $set:{
                    rating:Ratings.findOne({_id:doc.ratingId}).name
                }
            })
        }
    }


});

News.attachSchema(new SimpleSchema({

    'publicationId': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'text',
            }
        }
    },
    'publicationName': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'categoryId': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'categoryName': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'ratingId':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'select',
                options: function(){
                    return Ratings.find({}).map(function (c) {
                        return {label: c.name, value: c._id};
                    });
                }
            }
        }
    },
    'rating':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'isHeadline':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
            }
        }
    },
    'author':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'page':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'title': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'link':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'summary':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    },
    'comments':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    },
    'reportedById':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'reportedBy':{
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'text'
            }
        }
    },
    'inserted':{
        type: Date,
        optional: true
    }
}))