Template.textparser.helpers({
    category: function(){
        return sessionStorage.getItem('selectedCategoryId');
    },
    publication: function(){
        return sessionStorage.getItem('selectedPublicationId');
    },
})

Template.textparser.events({
    'submit form': function(event,template){
        event.preventDefault();

        var categoryId = template.find('#categoryId').value;
        var publicationId= template.find('#publicationId').value;
        var canvasContent= template.find('#canvas').value;

        console.log(canvasContent);
    }
})