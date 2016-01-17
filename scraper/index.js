/**
 * Created by Mob Rattson on 1/16/2016.
 */

var http = require('http');

var scraperVars = {
    baseUrl : 'http://www.reddit.com/r/interdimensionalcable',
    sorting : '/top/',
    time : '&t=all',
    limit : '&limit=100',
    show : '&show=all',
    total : 0,
    ids : [],
    ignoredCount : 0
};

module.exports = {
    scrapeNode: function (count, after) {

        http.get(buildUrl(count, after), function (res) {

            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {

                var data = JSON.parse(body);

                try {
                    var posts = data.data.children;

                    console.log("Posts: " + posts.length);

                    for(i in posts) {

                        var item = posts[i];

                        if(item.data.url.match(/^(https?\:\/\/)?(m|www)?\.?youtu\.?(be|com)/))
                            scraperVars.ids.push(item.data.url);
                        else {
                            console.log("### Ignored invalid URL: " + item.data.url);
                            scraperVars.ignoredCount++;
                        }
                    }

                    scraperVars.total += posts.length;
                    count = '&count=' + scraperVars.total;
                    after = '&after=' + data.data.after;

                    console.log("Calling again with after value of  " + after + "  and new current total of " + count);

                    if (data.data.after != null)
                        module.exports.scrapeNode(count, after);
                    else {
                        complete();
                        return scraperVars.ids;
                    }
                }
                catch (e) {
                    console.log("Error: " + e);
                }
            });
        }).on('error', function (e) {
            console.log("Got an error: ", e);
        });
    }
};

function buildUrl(count, after){
    return scraperVars.baseUrl + scraperVars.sorting + '.json?' + scraperVars.limit +
        scraperVars.show + scraperVars.time + count + after;
}

function complete(){
    console.log("Found " + scraperVars.total + " posts.");
    console.log("Ignored " + scraperVars.ignoredCount + " posts.");
    console.log(scraperVars.ids);
}