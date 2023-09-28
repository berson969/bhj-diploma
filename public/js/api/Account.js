/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account'
  static get(id = '', callback) {
    createRequest({
        url: `${this.URL}/${id}`,
        method: 'GET',
        data: null,
        callback: (err, response) => {
            callback(err, response)
            }
        }, (err, response) => {
            callback(err, response)
    })
  }
}
