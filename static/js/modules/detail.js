const getPopularComments = (pc)=>{
    let html = "";
    pc.forEach((item)=>{
        html += `
        <div class="popular_comments" >
            <a href="#">${item.author.name}</a>
            <span> 看过</span>
            <span>${item.created_at}</span>
            <div>${item.content}</div>
        </div>
        <hr class="hr_comment">
`
    })
    return html;
}
export const detail = (movieId) => {
    let url = "http://api.douban.com/v2/movie/subject/" + movieId + "?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=&udid="
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'jsonp',//可以跨域请求
        success: function (movieData) {
            // console.log(movieData.clip_urls)
            // console.log(movieData)
            let genres = movieData.genres.join();
            let html = `
    <div class="row">
        <div class="col-md-4 center">
            <img src="${movieData.images.small}">
        </div>
        <div class="col-md-8 center">
            <h4>中文名: ${movieData.title}</h4>
            <h4>原名:   ${movieData.original_title}</h4>
            <h4>上映日期： ${movieData.pubdates[0]}</h4>
            <h4>年代:${movieData.year} </h4>
            <h4>类型:${movieData.subtype} </h4>
            <h4>分类:${genres} </h4>
            <div>
                <h4>介绍:</h4>
               <div class="movie_summary">${movieData.summary}</div>
            </div>
        </div>

    </div>
    <div class="row ">
        <div class="col-md-8 popular_comments">
           ${getPopularComments(movieData.popular_comments)}
        </div>
        <div class="col-md-4">
            <video class="movie_video" src="${movieData.clip_urls[0]}" poster="${movieData.images.small}"  preload="preload" controls="controls">
            </video>
        </div>
  
    </div>
`
            $("#show").html(html)
        }
    })
}
