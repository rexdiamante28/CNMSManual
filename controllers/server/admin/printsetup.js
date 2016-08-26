if(Meteor.isServer){
    Meteor.methods({
        'getNewsPrint': function(date,category){
            var date = new Date(date);
            var tomorrow = new Date(date);
            tomorrow.setDate(tomorrow.getDate()+1);
            tomorrow = new Date(tomorrow);

             return News.find({
                 inserted:{
                     $lt:tomorrow,
                     $gte:date
                 },
                 categoryId: category
            }, {
                sort:{publicationName:1}
            }).fetch();
        }
    })
}