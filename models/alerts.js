Alerts = new Mongo.Collection('alerts');

Alerts.attachSchema(new SimpleSchema({

    'rssId': {
        type: String,
        optional: false
    },
    'alertId': {
        type: String,
        optional: true
    },
    'link':{
        type: String,
        optional: true
    },
    'title':{
        type: String,
        optional: true,
    },
    'published':{
        type: Date,
        optional: true
    },
    'updated':{
        type: Date,
        optional: true
    },
    'inserted':{
        type: Date,
        optional: true
    },
    'viewed':{
        type: Date,
        optional: true
    },
    'viewedBy':{
        type: String,
        optional: true
    },
    'status':{
        type: String,
        optional: true
    }

}))