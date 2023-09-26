/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

let formData = new FormData();



// function createRequest(options, callback)  {
const createRequest = (options = {}, p) => {

    let url
    // let formData = new FormData()

    console.log('options', options)
    if(options.data) {
        if (options.method === "GET") {

            const queryString = Object.keys(options.data)
                .map((key) => `${key}=${encodeURIComponent(options.data[key])}`)
                .join('&')

            console.log(queryString);
            url = `${options.url}?${queryString}`
        } else {

            Object.keys(options.data).forEach(key => {
                console.log('key', key, options.data[key] )
                formData.append(key, options.data[key].toString())
                console.log('formData000', formData.get(key))

            })

            url = options.url
        }
    } else {
        url = options.url
    }
    console.log(url)
    console.log("formData", formData.get('mail'))

    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'

    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status >= 200 && xhr.status < 300 && xhr.status) {
                options.callback(null, xhr.response)
                console.log('Данные, если нет ошибки', {response: xhr.response, status: xhr.status})
            } else {
                console.log( 'Ошибка, если есть', {status: xhr.status, statusText: xhr.statusText})
                options.callback({status: xhr.status, statusText: xhr.statusText}, null);
            }
        }
    }

    xhr.open(options.method, url)

    xhr.send(options.method === 'GET' ? null : formData)
}

// createRequest({
//     url: '/user/login',
//     data: {
//         mail: 'ivan@biz.pro',
//         password: 'odinodin'
//     },
//     method: 'POST',
//
//     callback: (err, response) => {
//         if (err) {
//             console.log("Ответ об ошибке", err)
//         } else {
//             console.log("Ответ положительный", response)
//         }
//     }
// });