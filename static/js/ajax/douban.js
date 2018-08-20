import {detail} from './../modules/detail';
import {para} from './../modules/para';
import {stopAjax} from "./../modules/util";

export const change = (url) => {

    let movieList;
    stopAjax();
    let ajax
    ajax = $.ajax({
        async:false,
        type: 'get',
        url: url,
        dataType: 'jsonp',//可以跨域请求
        success: function (data) {
            movieList = data;
            let html = `<div id="in_theaters" class="row">`;
            $.each(data.subjects, (index, item) => {
                let genres = item.genres.join();
                let div = `
                    <div id="movie_${item.id}" class="col-md-3 center">
                      <img class="img-size" src="${item.images.small}" >
                      <h4 class="movie-title">${item.title}</h4>
                      <h7  class="movie-genres" >${genres}</h7>
                     </div>
                `
                html += div;
            })
            html += `</div>`;
            $("#show").html(html)
        }
    })
    ajax.then(() => {
            $("#in_theaters").click(function (event) {
                let ev = event || window.event;
                let target = ev.target || ev.srcElement;
                if (target.nodeName.toLowerCase() == 'img') {
                    let index = $(target).parent().index();
                    let movieId = movieList.subjects[index].id;
                    history.pushState({a: 1}, "1", "detail");
                    detail(movieId)
                }
            })
        }
    )
    para.ajax.push(ajax)
}


