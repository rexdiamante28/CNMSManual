Categories = new Mongo.Collection('categories');

Categories.attachSchema(new SimpleSchema({

    'name': {
        type: String
    },
    'isHeadline':{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'boolean-checkbox'
            }
        }
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