let s = '[{"path":"/home","name":"home","label":"首页","icon":"s-home","url":"Home/Home"},{"path":"/mall","name":"mall","label":"商品管理","icon":"video-play","url":"Mall.vue"}]'
let o = {path:"/home","name":"home","label":"首页","icon":"s-home","url":"Home/Home"}
console.log(JSON.stringify(o))
console.log(JSON.parse(JSON.stringify(o)))
