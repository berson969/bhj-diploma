/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user'

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {

    if (user) {
      localStorage.user = JSON.stringify(user)
    } else {
      this.unsetCurrent()
    }
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {

    const user = localStorage.user
    if (user) {
      return JSON.parse(user)
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: 'GET',
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user)
        } else {
          this.unsetCurrent()
        }
        callback(err, response)
      }
    })
  }


  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: `${this.URL}/login`,
      method: 'POST',
      // responseType: 'json',
      data,

      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user)
        }
        callback(err, response)
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user)
        }
        callback(err, response)
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: 'POST',
      data: null,
      callback: (err, response) => {
        if (response) {
          User.unsetCurrent()
        }
        callback(err, response)
      }
    })
  }
}