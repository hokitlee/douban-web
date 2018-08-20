import css from "./../css/app.css"
import * as douban from './ajax/douban.js';
const baseUrl = 'https://api.douban.com';
const apikey = "?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&start=0&count=100&client=somemessage&udid=dddddddddddddddddddddd";
const inTheatersUrl = "/v2/movie/in_theaters";
const comingSoonUrl = "/v2/movie/coming_soon";
const top250Url = "/v2/movie/top250";

import {detail} from './modules/detail'

import {tmp} from './modules/para'
import * as para from "./modules/para";

douban.change(baseUrl + inTheatersUrl + apikey);
history.pushState({state: "home"}, "1", "");

(() => {
    $("#navigation").click((e) => {
        let bt = e.target.parentNode.parentNode.children;
        for (let i = 0; i < bt.length; i++) {
            bt[i].style.background = "";
        }
        e.target.parentNode.style.background = "#eeeeee"
        let state;
        switch (e.target.parentNode.id) {
            case "navigation_home": {
                state = "home";
                douban.change(baseUrl + inTheatersUrl + apikey)
                break;
            }
            case "navigation_int": {
                douban.change(baseUrl + inTheatersUrl + apikey)
                state = "int"
                break;
            }
            case "navigation_cs": {
                state = "cs"
                douban.change(baseUrl + comingSoonUrl + apikey)
                break;
            }
            case "navigation_top": {
                state = "top"
                douban.change(baseUrl + top250Url + apikey)
                break;
            }
        }
        history.pushState({state: state}, "1", state);
    })
})()

window.addEventListener("popstate", function () {
    let currentState = history.state.state;
    let url;
    switch (currentState) {
        case "home": {
            url = inTheatersUrl;
        }
        case "int": {
            url = inTheatersUrl;
        }
        case "cs": {
            url = comingSoonUrl;
        }
        case "top": {
            url = top250Url;
        }
    }
    douban.change(baseUrl + url + apikey);
    // console.log(currentState)
});