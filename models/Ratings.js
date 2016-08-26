Ratings = new Mongo.Collection('ratings');

Ratings.attachSchema(new SimpleSchema({

    'name': {
        type: String
    },
    'description':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    }
}))