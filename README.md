# Валидация банковской карты

Определяет платежную систему и банк по номеру карты [демо](https://yandex.ru)

## Поддержка 
По первым 2 цифрам определяет платежную систему
 * МИР
 * VISA
 * MasterCard
 * Maestro

По первым 6 цифрам определяет банк карты
 * Райффайзенбанк
 * Сбербанк
 * Альфа-банк
 * Тинькофф 
 * ВТБ
 * МТС банк
 * Росбанк
 * Qiwi

Если нету вашего банка или платежной системы, то будут использоваться стандартные настройки

## Старт 
```
new Card({
    imgPayment: '.payment', // Платежная система
    bankLogo: '.bank-logo', // Логотип банка
    code: '.card-cvv',      // Код безопасности карты 
    frontCard: '.front',    // Лицевая сторона карты
    title: '.bank-title',   // Название банка
    links: '.logo-link'     // Ссылка на банк
});
```
***
Позволяет добавить в поля ввода атрибуты:
- `data-length` длинна символов при котором произойдет переход на другое поле воода
- `data-next` на какое именно поле ввода будет переход
```
 <input  type="text"
         class="field card-date"
         id="mm"
         placeholder="MM"
         maxlength="2"
         data-length="2"
         data-next="#yy" />

<input  type="text"
         class="field card-date"
         id="yy"
         placeholder="ГГ"
         maxlength="2"
         data-length="2"
         data-next="#code" />
```

``` 
function nextFocus(el) {
    let value = el.value.replace(/\s/g, '')
    let maxLength = el.dataset.length
    let nextFocus = el.dataset.next

    if (value.length == maxLength) {
        document.querySelector(nextFocus).focus()
    }
}
```

