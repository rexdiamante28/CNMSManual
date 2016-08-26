Template.textparser.helpers({
    category: function(){
        return sessionStorage.getItem('selectedCategoryId');
    },
    publication: function(){
        return sessionStorage.getItem('selectedPublicationId');
    },
})