ReloadNewsPrint1 = function(date,category){
    SpinnerShow();
    Meteor.call('getNewsPrint',date,category,function(error,result){
        CNews1.remove({});
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
                 CNews1.insert({
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


                CNews1.insert({
                    newsId: result[a]._id,
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
    },
    news: function(){
        return CNews1.find({},{sort:{publicationNumber:1}});
    },
    ratings: function(){
        return  Ratings.find({});
    }
})

Template.newsnow.onCreated(function(){
    CNews1 = new Mongo.Collection(null);
    date = new Date();
    category = "";
})

Template.newsnow.onRendered(function(){
    date = FormatDate(new Date());
    $('#date').val(FormatDate(new Date()));
    ReloadNewsPrint1(date,category,function(){});
})

Template.newsnow.events({
    'change #category': function(event){
        category = event.currentTarget.value;
        ReloadNewsPrint1(date,category,function(){});
    },
    'change #date': function(event){
        date = event.currentTarget.value;
        ReloadNewsPrint1(date,category,function(){});
    },
    'change .selectrating': function(event){
        Meteor.call('updateRatings',event.currentTarget.name, event.currentTarget.value ,function(error,result){
            if(error){
                alertify.error("Something went wrong. "+error.message);
            }
            else{
                alertify.success("Rating changed.");
            }
        });
    },
    'submit #commentmodal': function(event,template){
        event.preventDefault();
        $('#commentModalClose').click();
        var newsId = template.find('#modalNewsId').value;
        var comment = template.find('#modalComment').value;

        Meteor.call('updateComment',newsId,comment, function(error,result){
            if(error){
                alertify.error("Something went wrong. "+error.message);
            }
            else{
                Meteor.call('getComment',newsId,function(error,result){
                    if(error){
                        $('#modalComment').val("There is an error fetching the comment.");
                    }
                    else{
                        var id = '#comment'+newsId;
                        $(id).html(result);
                        console.log($(id));
                    }
                });
                alertify.success("Comment updated.");
            }
        });

    },
    'click .commentButton': function(event){
        var newsId = event.currentTarget.id;
        $('#modalNewsId').val(newsId);
        Meteor.call('getComment',newsId,function(error,result){
            if(error){
                $('#modalComment').val("There is an error fetching the comment.");
            }
            else{
                $('#modalComment').val(result);
            }
        });
    }
})