ReloadNews = function(dateFrom,dateTo,category,publication,rating,skipCount,limit,search){
    SpinnerShow();
    Meteor.call('getNews',dateFrom,dateTo,category,publication,rating,skipCount,limit,search,function(error,result){
        CNews.remove({});
        if(error){alert(error.message)}
        else{
            for(var a =0; a< result.length; a++){
                CNews.insert({
                    publicationId: result[a].publicationId,
                    publicationName: result[a].publicationName,
                    categoryId: result[a].categoryId,
                    categoryName: result[a].categoryName,
                    ratingId: result[a].ratingId,
                    rating: result[a].rating,
                    page: result[a].page,
                    title: result[a].title,
                    link: result[a].link,
                    summary: result[a].summary,
                    comments: result[a].comments,
                    reportedById: result[a].reportedById,
                    reportedBy: result[a].reportedBy,
                    inserted: result[a].inserted
                })
            }
            SpinnerHide();
        }
    });
}

ReloadNewsPages= function(dateFrom,dateTo,category,publication,rating,limit,search){
    Meteor.call('getNewsPages',dateFrom,dateTo,category,publication,rating,limit,search,function(error,result){
        if(error){}
        else{
            $('#actualPage').html(currentPage);
            $('#totalPage').html(result);
        }
    });
}

if(Meteor.isClient){
    Template.news.onCreated(function(){
        CNews = new Mongo.Collection(null);
        currentPage = 1;
        limit = 10;
        skipCount = (currentPage - 1) * limit;
        dateFrom = "";
        dateTo = "";
        publication = "";
        rating = "";
        category="";
        search="";
    })

    Template.news.onRendered(function(){
        ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
        ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
        SpinnerHide();
        ToggleElement(['advancedfilters']);
    })

    Template.news.helpers({
        news: function(){
            return CNews.find({});
        },
        ratings: function(){
            return Ratings.find({});
        }
    })

    Template.newnews.helpers({
        category: function(){
            return sessionStorage.getItem('selectedCategoryId');
        },
        publication: function(){
            return sessionStorage.getItem('selectedPublicationId');
        },
    })

    Template.news.events({
        'click #advancebutton': function(){
          $('#advance')[0].reset();
            ToggleElement(['advancedfilters']);
            dateFrom = "";
            dateTo = "";
            publication = "";
            rating = "";
            category="";
        },
        'submit #searchForm':function(event,template){
            event.preventDefault();
            search = template.find('#searchInput').value;
            currentPage =1;

            ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
            ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
        },
        'submit #advance':function(event,template){
            event.preventDefault();

            dateFrom = template.find('#dateFrom').value;
            dateTo = template.find('#dateTo').value;
            category = template.find('#category').value;
            publication = template.find('#publication').value;
            rating = template.find('#rating').value;
            currentPage =1;
            search = $('#searchInput').val();


            ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
            //ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
        },
        'change #recordLimit': function(event,template){
            limit = parseInt(template.find('#recordLimit').value);
            skipCount = (currentPage - 1) * limit;

            ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
            ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
        },
        'click #prevPage': function(){
            if(currentPage>0){
                currentPage--;
                if(currentPage==0){currentPage++;}
                skipCount = (currentPage - 1) * limit;

                ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
                ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
            }
        },
        'click #nextPage': function(){
            var totalpage = parseInt($('#totalPage').html());
            if(currentPage<totalpage){
                currentPage++;
                skipCount = (currentPage - 1) * limit;
                ReloadNews(dateFrom,dateTo,category,publication,rating,skipCount,limit,search);
                ReloadNewsPages(dateFrom,dateTo,category,publication,rating,limit,search);
            }
        },
    })
}
