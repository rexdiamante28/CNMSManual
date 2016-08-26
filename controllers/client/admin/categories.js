Template.categories.helpers({
    categories: function(){
       return Categories.find({});
    }
})

Template.categoryselect.helpers({
    categories: function(){
        return Categories.find({});
    }
})

Template.categoryselect.events({
    'submit #categoryselectform': function(event,template){
        event.preventDefault();
        var category = template.find('#categselect').value;
        if(category === ""){
            alertify.error("Please select a category to proceed");
        }
        else{
            sessionStorage.setItem('selectedCategoryId',category);
            Router.go('/user/publicationselect');
        }
    }
})