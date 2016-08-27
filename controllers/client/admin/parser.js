Template.textparser.helpers({
    category: function(){
        return sessionStorage.getItem('selectedCategoryId');
    },
    publication: function(){
        return sessionStorage.getItem('selectedPublicationId');
    },
})

/*
page
rating
headline
title
link
summary
comment
*/

Template.textparser.onCreated(function(){
    CN = new Mongo.Collection(null);
})

Template.textparser.onRendered(function(){
    $(".lined").linedtextarea(
        //{selectedLine: 1}
    );
})

Template.textparser.events({
    'submit form': function(event,template){
        event.preventDefault();

        var categoryId = template.find('#categoryId').value;
        var publicationId= template.find('#publicationId').value;
        var canvasContent= template.find('#canvas').value;

        var lines = canvasContent.split('\n');
        var failedEntries="";
        var entryCounter=0;
        var lineInEntry = 0;
        var validator = true;
        var errorlines= [];


        //this will work but will assume that every input is correct
        CN.remove({});
        for(var a = 0;a < lines.length;a++){
            if(lines[a]===""){
                if(a+8<=lines.length){
                    if(lines[a+8]!==""&& a+8<lines.length){
                        validator = false;
                        errorlines.push(a+9);
                    }
                    //console.log("valid   "+(a+8)+"    "+lines.length+"    "+lines[a] );
                    var page = lines[a+1];
                    var rating = lines[a+2];
                    var headline = lines[a+3];
                    var title = lines[a+4];
                    var link = lines[a+5];
                    var summary = lines[a+6];
                    var comment = lines[a+7];

                    if(Ratings.findOne({name: rating})){
                        rating = Ratings.findOne({name: rating})._id
                    }
                    else
                    {
                        validator = false;
                        errorlines.push(a+3);
                    }
                    if(isNaN(page)){
                        validator= false;
                        errorlines.push(a+2);
                    }
                    if(headline==="T"||headline==="t"){
                       headline="TRUE";
                    }else if(headline==="F"||headline==="f"){
                        headline = "FALSE";
                    }
                    else{
                        validator = false;
                        errorlines.push(a+4);
                    }
                    if(comment==="--"){
                        comment="";
                    }

                    CN.insert({
                        categoryId: categoryId,
                        publicationId: publicationId,
                        page: page,
                        ratingId: rating,
                        isHeadline: headline,
                        title: title,
                        link: link,
                        summary:summary,
                        comments: comment
                    });

                    entryCounter++;
                }
                else{
                    validator = false;
                    errorlines.push(a+1);
                }
            }
        }

        if(validator){
            var entries = CN.find({}).fetch();

            $('#canvas').val("");

            for(var c=0; c<entries.length; c++){
                News.insert({
                    categoryId: entries[c].categoryId,
                    publicationId: entries[c].publicationId,
                    page: entries[c].page,
                    ratingId: entries[c].ratingId,
                    isHeadline: entries[c].isHeadline,
                    title: entries[c].title,
                    link: entries[c].link,
                    summary:entries[c].summary,
                    comments: entries[c].comments
                },function(error,result){
                    if(!error){
                        alertify.success('News report added successfully.');
                    }
                });
            }

        }
        else{
            $('.lineno').css({"color":"white"});
            console.log(errorlines);
            for(var a=0;a<errorlines.length; a++){
                var selector = ".lineno:nth-child("+errorlines[a]+")";
                $(selector).css({"color":"red"});
                $(selector).attr({"title":"error"});
            }
            //console.log(errorlines);
            alertify.error('There is something wrong with your entry. Please re-check. If you find this difficult, use the form instead.');
        }
    }
})