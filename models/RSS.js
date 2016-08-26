RSS = new Mongo.Collection('rss');

RSS.attachSchema(new SimpleSchema({

    'keyword': {
        type: String
    },
    'link': {
        type: String
    },
    'status':{
        type: String
    },
    'createdBy':{
        type: String
    },
    'createdByName':{
        type: String
    },
    'assignedTo':{
        type: String
    },
    'assignedToName':{
        type: String
    },
    'createdAt':{
        type: Date
    }

}))