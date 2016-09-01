UI.registerHelper('StringLimit', function(number,String){
    if(String.length>number){
        return String.substring(0,number)+"...";
    }
    else
    {
        return String;
    }

})

UI.registerHelper('formatDate', function(date) {
    return moment(date).format('MMM-DD-YYYY');
});

UI.registerHelper('formatDateNow', function(date,format) {
    return moment(date).format(format);
});

UI.registerHelper('msToM', function(ms) {
    return ((ms/1000)/60)
});

UI.registerHelper('lessThan', function(value1, value2) {
    return (value1<value2);
});

UI.registerHelper('greaterThan', function(value1, value2) {
    return (value1>value2);
});
UI.registerHelper('isEqual', function(value1,value2) {
    if(value1===value2){
        return true;
    }else
    {
        return false;
    }
});

UI.registerHelper('isUnequal', function(value1,value2) {
    if(value1===value2){
        return false;
    }else
    {
        return true;
    }
});
