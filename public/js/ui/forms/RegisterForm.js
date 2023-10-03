/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState('user-logged')
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log('RegisterForm.onSubmit(data)')
    User.register(data, (err, response) => {
        this.element.reset()
        if (response && response.success) {
           App.setState('user-logged')
           const modalRegister = App.getModal('register')
           console.log('modalRegister', modalRegister)
           modalRegister.close()
        } else {
            console.log('Ошибка RegisterForm', err )
        }
    })
  }
}