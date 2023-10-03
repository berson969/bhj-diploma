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
  constructor(element) {
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
  update() {
    const currentUser = User.current()
    const content = document.querySelector('.content-header')

    if (currentUser) {
      this.element.querySelector('.user-name').textContent = currentUser.name
      content.style.display = 'block'
    } else {
      content.style.display = 'none'
    }
  }
}

//     const mainPanel = document.querySelector('.main-sidebar')
//     const userName = document.querySelector('.user-name')
//     const content = document.querySelector('.content-header')
//
//     console.log('currentUser_update', currentUser)
//     if (currentUser) {
//
//       mainPanel.classList.add('app_user-logged')
//       userName.textContent = currentUser.name
//       App.getModal( 'login' ).close()
//       content.style.display = 'block'
//     } else {
//       userName.textContent = ""
//       mainPanel.classList.remove('app_user-logged')
//       content.style.display = 'none'
//     }
//   }
// }
