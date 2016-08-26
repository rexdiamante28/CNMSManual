Template.categories.helpers({
    categories: function(){
       return Categories.find({});
    }
})


Template.categories.events({
    'click .remove': function(event){
        Categories.remove({_id:event.currentTarget.id});
    }
})



Template.editcategory.helpers({
    doc: function(){
        return Categories.findOne({_id:P_categoryId});
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