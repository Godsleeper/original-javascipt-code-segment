//使用nodejs实现小爬虫
var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';


var filterChapters = function(html) {
    var $ = cheerio.load(html)
    var chapters = $(".chapter");
    var courseData = [];

    chapters.each(function(index, item) {
        var chapter = $(item);
        var chapterTitle = chapter.find("strong").text();
        var videos = chapters.find("li");

        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function(index, item) {
            var video = $(item).find(".studyvideo");
            var videoTitle = video.text();
            var id = video.attr("href").split("video/")[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })

        courseData.push(chapterData);
    })

    return courseData;
}

var printCourseInfo = function(courseData) {
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');
        item.videos.forEach(function(video) {
            console.log('【' + video.id + '】' + video.title.trim() + '\n')
        })
    })
}

http.get(url, function(res) {
    var html = '';
    res.on("data", function(data) {
        html += data;
    })
    res.on("end", function() {
        var courseData = filterChapters(html);
        printCourseInfo(courseData);
    })
}).on("error", function() {
    console.log("获取课程数据出错")
})
