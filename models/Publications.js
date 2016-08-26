Publications = new Mongo.Collection('publications');

Publications.attachSchema(new SimpleSchema({

    'name': {
        type: String
    },
    'status': {
        type: String,
        autoform: {
            type: "select-radio",
            options: function () {
                return [
                    {label: "Active", value: "Active"},
                    {label: "Inactive", value: "Inactive"}
                ];
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