News = new Mongo.Collection('news');

News.after.insert(function (userId, doc) {
    News.update({_id:doc._id},{
        $set:{
            publicationName: Publications.findOne({_id:doc.publicationId}).name,
            categoryName: Categories.findOne({_id:doc.categoryId}).name,
            rating: Ratings.findOne({_id:doc.ratingId}).name,
            reportedById: Meteor.userId(),
            reportedBy: Meteor.user().profile.name,
            inserted: new Date()
        }
    });
});

/*News.after.update(function (userId, doc, fieldNames, modifier, options) {
    News.update({_id:doc._id},{
        $set:{
            publicationName: Publications.findOne({_id:doc.publicationId}).name,
            categoryName: Categories.findOne({_id:doc.categoryId}).name,
            rating: Ratings.findOne({_id:doc.ratingId}).name,
            reportedById: Meteor.userId(),
            reportedBy: Meteor.user().profile.name
        }
    });
});*/

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
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
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