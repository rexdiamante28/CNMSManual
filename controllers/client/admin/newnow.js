ReloadNewsPrint = function(date,category){
    SpinnerShow();
    Meteor.call('getNewsPrint',date,category,function(error,result){
        CNews.remove({});
        if(error){alert(error.message)}
        else{
            var type = "";
            var isheadline = "";
            for(var a =0; a< result.length; a++){
                if(a==0){
                    type = "new";
                }else{
                    if(result[a].publicationId===result[a-1].publicationId){
                        type = "same";
                    }else{
                        type = "new";
                    }
                }

                /*if(type==="new"&&a>0){
                 CNews.insert({
                 publicationId: "",
                 publicationName: "",
                 categoryId: "",
                 categoryName: "",
                 ratingId: "",
                 rating: "",
                 page: "",
                 isHeadline: "",
                 title: "",
                 link: "",
                 summary: "",
                 comments: "",
                 reportedById: "",
                 reportedBy: "",
                 inserted: "",
                 type: "blank"
                 })
                 }*/

                if(type==="new" && result[a].isHeadline==="TRUE"){
                    isheadline = "TRUE";
                }else{
                    isheadline = "FALSE";
                }


                CNews.insert({
                    publicationId: result[a].publicationId,
                    publicationName: result[a].publicationName,
                    categoryId: result[a].categoryId,
                    categoryName: result[a].categoryName,
                    ratingId: result[a].ratingId,
                    rating: result[a].rating,
                    page: result[a].page,
                    isHeadline: isheadline,
                    author: result[a].author,
                    title: result[a].title,
                    link: result[a].link,
                    summary: result[a].summary,
                    comments: result[a].comments,
                    reportedById: result[a].reportedById,
                    reportedBy: result[a].reportedBy,
                    inserted: result[a].inserted,
                    type: type,
                    publicationNumber: Publications.findOne({_id:result[a].publicationId}).number
                })
            }
            SpinnerHide();
            SetupTable();
        }
    });
}

Template.newsnow.helpers({
    categories: function(){
        return Categories.find({});
    }
})

Template.newsnow.onCreated(function(){
    CNews = new Mongo.Collection(null);
    date = new Date();
    category = "";
})

Template.newsnow.onRendered(function(){
    ReloadNewsPrint(date,category,function(){});
    $('#date').val(FormatDate(new Date()));
})