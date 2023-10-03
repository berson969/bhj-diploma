/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log("onSibmitLoginForm")
    User.login(data, (err, response) => {
      this.element.reset()
      console.log('callbackFormLogin', err, response)
      if (response && response.success) {
        App.setState('user-logged')
        const modalLogin = App.getModal('login')
        console.log('modalLogin', modalLogin)
        modalLogin.close()
      } else {
        console.log('Ошибка LoginForm', err )
      }
    })
  }
}