/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}, p) => {

    // const URL = 'http://localhost:8000'
    const URL = ''
    let queryString = ''

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


    try {
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE && xhr.status >= 200 && xhr.status < 304) {
                console.log('Status', xhr.response)
                if (xhr.response && xhr.response.success) {
                    options.callback(null, xhr.response)
                } else {
                    console.log('StatusError', xhr.error)
                    options.callback(xhr.error, null)
                }
            }
        });
    } catch (error) {
        options.callback(error, null);
    }
    // console.log('XHR.request', options.method, options.url, options.data, "formData", formData.get('email'))
    xhr.open(options.method, URL + options.url + queryString, true)
    // xhr.withCredentials = true
    xhr.send(options.method === 'GET' ? null : formData)
    // xhr.send(formData)
    return xhr
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