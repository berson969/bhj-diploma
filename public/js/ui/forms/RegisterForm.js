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
    User.register(data, callback => {
      if (callback.response) {
        if (callback.response.success) {
          App.setState('user-logged')
          const modalRegister = App.getModal()
          console.log('modalRegister', modalRegister)
          modalRegister.close()
          callback(null, callback.response.user)
        } else {
          callback(callback.err, null)
        }
      }
    })
  }
}