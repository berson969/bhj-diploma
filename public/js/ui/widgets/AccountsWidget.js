/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element
      this.registerEvents()
      this.update()
    } else {
      throw new Error('Element is required')
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelector('.create-account')
    createAccount.addEventListener('click', (event) => {
      event.preventDefault()
      const modalCreateAccount = App.getModal('createAccount')
      if (modalCreateAccount) {
        modalCreateAccount.open()
      }
    })

    const accounts = document.querySelectorAll('.account')
    if (accounts) {
      accounts.forEach((account) => {
        account.addEventListener("click", (event) => {
          this.onSelectAccount(event.target.closest('.account'))
        })
      })
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current()

    if (user) {
        Account.list(user, (err, response) => {
          if (response && response.success) {
            this.clear()
            this.renderItems(response.data)
          }
        })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const deletedAccounts = this.element.querySelectorAll('.account')
    deletedAccounts.forEach(deletedAccount => deletedAccount.remove())
  }

  /**
   * Срабатывает в момент выбора счёта
   * устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {

    const activeElement = this.element.querySelector('.active')
    if (activeElement) {
      activeElement.classList.remove('active')
    }
    element.classList.add('active')
    App.showPage('transactions', { account_id: element.dataset.id})

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const formattedSum = item.sum.toLocaleString('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return `<li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> //
            <span>${formattedSum} ₽</span> 
        </a>
    </li>
    `
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItems(data){
    if(data) {
      data.forEach((item) => {
        const accountHTML = this.getAccountHTML(item)
        this.element.insertAdjacentHTML('beforeend', accountHTML)
        this.registerEvents()
      })
    }
  }
}
