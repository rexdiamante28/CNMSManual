Template.publications.helpers({
    publications: function(){
       return Publications.find({});
    }
})

Template.publications.events({
    'click .remove': function(event){
        Publications.remove({_id:event.currentTarget.id});
    }
})

Template.editpublication.helpers({
    doc: function(){
      return  Publications.findOne({_id:P_publicationId});
    }
})



Template.publicationselect.helpers({
    publications: function(){
        return Publications.find({});
    }
})

Template.publicationselect.events({
    'submit #publicationselectform': function(event,template){
        event.preventDefault();
        var category = template.find('#pulicationselect').value;
        if(category === ""){
            alertify.error("Please select a publication to proceed");
        }
        else{
            sessionStorage.setItem('selectedPublicationId',category);
            Router.go('/user/newnews');
        }
    }
})