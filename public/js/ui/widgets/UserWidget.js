/**
 * Класс UserWidget отвечает за
 * отображение информации об имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if (element) {
      this.element = element
    } else {
      throw new Error('Element is required')
    }
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    const currentUser = User.current()
    console.log('currentUser', currentUser)
    const userName = document.querySelector('.user-name')
    userName.textContent = currentUser.name
    document.body.classList.remove('app_user-logged')

  }
}
