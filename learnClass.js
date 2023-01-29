
var apiTemp = (desc, url, path, method) => {
  const [name] = path.split('/').slice(-1)
  const m = method.toLocaleLowerCase()
  const host = '`${env.API_HOST}' + path.slice(1) + '`'
 return `
 /** 
  * 接口名称：${desc}
  * YAPI: ${url}
  */
  static async ${name} (model) {
    const {data} = await Request.${m}(${host}, model)
    return data
  }`
}

// var temp = (className) =>{
//    return  `export default class ${classname}{
    
//    }`
// } 

function createFun() {
 const trs = Array.from(document.querySelectorAll('tbody tr'))
 return trs.map(tr => {
     const desc = tr.querySelector('td a').innerText
     const url = tr.querySelector('td a').href
//        const url = `http://ooooo-yapi.natapp1.cc/${u}`
     const path =  tr.querySelector('td div .path').innerHTML
     const method = tr.querySelector('.colValue').innerHTML
     return apiTemp(desc, url, path, method)
 })
}

function createClass(classname){
  return  `export default class ${classname} {
    ${createFun().join('\n\n')}
  }`
}

console.log(createClass())

