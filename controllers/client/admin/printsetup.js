ReloadNewsPrint = function(date,category){
    SpinnerShow();
    Meteor.call('getNewsPrint',date,category,function(error,result){
        CNews.remove({});
        if(error){alert(error.message)}
        else{
            var type = "";
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

                if(type==="new"&&a>0){
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
                }

                CNews.insert({
                    publicationId: result[a].publicationId,
                    publicationName: result[a].publicationName,
                    categoryId: result[a].categoryId,
                    categoryName: result[a].categoryName,
                    ratingId: result[a].ratingId,
                    rating: result[a].rating,
                    page: result[a].page,
                    isHeadline: result[a].isHeadline,
                    title: result[a].title,
                    link: result[a].link,
                    summary: result[a].summary,
                    comments: result[a].comments,
                    reportedById: result[a].reportedById,
                    reportedBy: result[a].reportedBy,
                    inserted: result[a].inserted,
                    type: type
                })
            }
            SpinnerHide();
            SetupTable();
        }
    });
}

Template.printsetup.helpers({
    categories: function(){
        return Categories.find({},{sort:{publicationName:1}});
    }
})

Template.printsetup.events({
    'submit form': function(event,template){
        event.preventDefault();

        var category = template.find('#category').value;
        var date = template.find('#date').value;
        if(category==="" || date ===""){
            if(category===""){
                alertify.error("Please select a category");
            }
            if(date===""){
                alertify.error("Please select a date");
            }
        }
        else{
            sessionStorage.setItem('print_category',category);
            sessionStorage.setItem('print_categoryname',Categories.findOne({_id:category}).name);
            sessionStorage.setItem('print_date',date);
            window.open('printnow','_blank');
            //Router.go('/user/printnow');
        }
    }
})

Template.printnow.helpers({
    categoryName: function(){
        return sessionStorage.getItem('print_categoryname');
    },
    date: function(){
        return new Date(sessionStorage.getItem('print_date'));
    },
    news: function(){
        return CNews.find({});
    }
})

Template.printnow.onCreated(function(){
    CNews = new Mongo.Collection(null);
    date = sessionStorage.getItem('print_date');
    category = sessionStorage.getItem('print_category');
})

Template.printnow.onRendered(function(){
    ReloadNewsPrint(date,category,function(){});
})