if(Meteor.isServer){
    Meteor.methods({
        'getNews': function(datefrom,dateTo,category,publication,rate,skip,limit,search){
            console.log(rate);
            if(search=="" && datefrom == "" && dateTo == "" && publication == "" && rate == ""  && category == "" ){
                console.log("parameters are empty");
                return News.find({}, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();

            }
            else if(search!="" && datefrom == "" && dateTo == "" && publication == "" && rate == "" && category == "" ){
                console.log("parameters are empty  except from search");
                return News.find({
                    $or:[
                        {publicationName: new RegExp(search,"i")},
                        {link: new RegExp(search,"i")},
                        {title: new RegExp(search,"i")},
                        {rating: new RegExp(search,"i")},
                        {comments: new RegExp(search,"i")},
                        {reportedBy: new RegExp(search,"i")},
                        {categoryName: new RegExp(search, "i")}
                    ]
                }, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();

            }
            else if(search!="" && datefrom != "" && dateTo != "" && publication != "" && rate != ""  && category != "" ){
                console.log("parameters are not empty");
                datefrom = new Date(datefrom);
                dateTo = new Date(dateTo);
                return News.find({
                    $or:[
                        {publicationName: new RegExp(search,"i")},
                        {link: new RegExp(search,"i")},
                        {title: new RegExp(search,"i")},
                        {rating: new RegExp(search,"i")},
                        {comments: new RegExp(search,"i")},
                        {reportedBy: new RegExp(search,"i")},
                        {categoryName: new RegExp(search, "i")}
                    ],
                    inserted:{$gte:datefrom},
                    inserted:{$lte:dateTo},
                    publicationName: publication,
                    rating: rate,
                    categoryName: category
                }, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }
            else if(search=="" && datefrom != "" && dateTo != "" && publication != "" && rate != ""  && category != "" ){
                console.log("parameters are not empty");
                datefrom = new Date(datefrom);
                dateTo = new Date(dateTo);
                return News.find({
                    inserted:{$gte:datefrom},
                    inserted:{$lte:dateTo},
                    publicationName: publication,
                    rating: rate,
                    categoryName: category
                }, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }
            else{
                return News.find({_id:'non-existing id'}, {
                    sort:{inserted:1},
                    limit: limit,
                    skip: skip
                }).fetch();
            }

        },
        'getNewsPages': function(datefrom,dateTo,category,publication,rate,limit,search){
            if(search=="" && datefrom == "" && dateTo == "" && publication == "" && rate == ""){

                var unrounded = News.find({}, {
                    sort:{inserted:1}
                }).count()/limit;

                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }
            else{
                 unrounded = News.find({
                        $or:[
                            {publicationName: new RegExp(search,"i")},
                            {link: new RegExp(search,"i")},
                            {title: new RegExp(search,"i")},
                            {rating: new RegExp(search,"i")},
                            {comments: new RegExp(search,"i")},
                            {reportedBy: new RegExp(search,"i")},
                            {categoryName: new RegExp(search, "i")}
                        ]
                    }, {
                        sort:{inserted:1}
                    }).count()/limit;
                var rounded = Math.round(unrounded);

                if(unrounded>rounded){
                    rounded++;
                }

                return rounded;
            }

        }
    })
}