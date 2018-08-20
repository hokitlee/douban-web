import {para} from './para'

export let stopAjax = ()=>{
    para.ajax.forEach((item)=>{
        console.log(item)
    })
}
