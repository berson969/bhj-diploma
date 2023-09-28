/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const URL = 'http://localhost:8000'
let queryString = ''
const createRequest = (options = {}, p) => {

    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    const formData = new FormData()

    console.log('options', options)
    if(options.data) {
        if (options.method === "GET") {

            queryString = "?" + Object.keys(options.data)
                .map((key) => `${key}=${encodeURIComponent(options.data[key])}`)
                .join('&')
        } else {
            Object.keys(options.data).forEach(key => {
                formData.append(key, options.data[key].toString())
            })
        }
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    options.callback(null, xhr.response)
                    console.log('Данные, если нет ошибки', {response: xhr.response, status: xhr.status})
                } else {
                    console.log('Ошибка, если есть', {status: xhr.status, statusText: xhr.statusText})
                    options.callback({status: xhr.status, statusText: xhr.statusText}, null);
                }
            }
        }
    }
    console.log('request', options.method, options.url, formData.get('email'))
    xhr.open(options.method, URL + options.url + queryString, true)
    xhr.withCredentials = true
    xhr.send(options.method === 'GET' ? null : formData)
}

// createRequest({
//     url: '/user/login',
//     data: {
//         email: 'ivan@biz.pro',
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