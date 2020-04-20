'use strict'
import '@babel/polyfill';


if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
export default class Card {
    constructor({
        imgPayment, // Платежная система
        bankLogo,   // Логотип банка
        code,       // Код безопасности карты 
        frontCard,  // Лицевая сторона карты
        title,      // Название банка
        links }) {  // Ссылка на банк

        this.imgPayment = document.querySelector(imgPayment)
        this.bankLogo = document.querySelector(bankLogo)
        this.cardCode = document.querySelector(code)
        this.frontCard = document.querySelector(frontCard)
        this.bankTitle = document.querySelector(title)
        this.bankLink = document.querySelector(links)
    }
    get numberValidate() {
        return this._numberCard
    }
    set numberValidate(value) {
        this._numberCard = value.replace(/\s/g, '');
        let numLength = this.numberValidate.length
        if (numLength === 2) {
            this.paymentImg(this.paymentValidate())
        }
        if (numLength === 6 || numLength >= 16) {
            this.paymentImg(this.paymentValidate())
            this.styleCard(this.bankDefinition())
        }
    }
    paymentImg({ name = 'default', codeName = 'CVV' }) {
        const img = this.imgPayment
        img.src = `./assets/img/payment-img/${name}.png`
        this.cardCode.setAttribute('placeholder', codeName)
    }
    styleCard(bankName) {
        const bank = this.banks[bankName]

        const bankVisible = document.querySelector('.bank')
        const dateLabel = document.querySelector('.date-label')

        this.frontCard.style.backgroundColor = bank.cardBg
        this.bankLink.setAttribute('href', bank.url)
        this.bankTitle.innerText = bank.text
        this.bankLink.style.color = bank.txtColor
        this.bankLogo.src = `./assets/img/banks/${bankName}.png`
        dateLabel.style.color = bank.lighten ? '#fff' : "#000"

        if ('createBank' in bank) {

            bankVisible.style.display = 'block'
            bankVisible.innerText = bank.createBank

        } else {
            bankVisible.style.display = 'none'
        }
    }
    paymentValidate() {
        let payment = []

        for (let i = 0; i < this.payments.length; i++) {
            if (this.payments[i].pattern.test(this.numberValidate)) {
                payment.push(this.payments[i])
                break;
            }
        }
        return payment.length === 1 ? payment[0] : ''
    }
    bankDefinition() {
        const bin = this.numberValidate.match(/^\d{6}/).join('')

        return this.binsCheck(bin) // bank name 
    }
}

const card = new Card({
    imgPayment: '.payment',
    bankLogo: '.bank-logo',
    code: '.card-cvv',
    frontCard: '.front',
    title: '.bank-title',
    links: '.logo-link'
});

function inputData() {
    if (/\D/g.test(this.value)) {
        this.value = this.value.replace(/\D/g, '')
    }
    if (this.classList.contains('card-number') && this.value !== '') {
        this.value = this.value.match(/\d{1,4}/g).join(' ');
        card.numberValidate = this.value
    }
    nextFocus(this)
}

const inputs = document.querySelectorAll('input')
inputs.forEach(el => {
    el.addEventListener("input", inputData)
})

function nextFocus(el) {
    let value = el.value.replace(/\s/g, '')
    let maxLength = el.dataset.length
    let nextFocus = el.dataset.next

    if (value.length == maxLength) {
        document.querySelector(nextFocus).focus()
    }
}

let timerID;

const demoCard = (count) => {
    const cardNum = ['2222221234567890', '4274000987654321', '5336695432167890', '5555551234432112',
        '4377720987654321', '5536910987667890', '2200241233216776', '5185054000000421',
        '4042044321789009', '5526180008000921', '4008122121214256', '551996234156731', '4267400987567832']

    let placeholderValue = cardNum[count].match(/\d{1,4}/g).join(' ')

    inputs[0].setAttribute('placeholder', placeholderValue)

    card.numberValidate = cardNum[count]
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.demo').addEventListener('click', function () {

        this.classList.toggle('active')

        if (this.classList.contains('active')) {

            this.innerText = 'Откл'

            timerID = setInterval(((count) => {

                return () => {

                    demoCard(count)
                    count++

                    if (count === 13) count = 0
                }
            })(0), 1500)
        }

        if (!this.classList.contains('active')) {
            this.innerText = 'Демо'
            clearInterval(timerID)
        }
    })
})

Card.prototype.payments = (function () {
    return [
        {
            name: 'mir',
            pattern: /^22\d*$/,
            codeName: 'CVC'
        },
        {
            name: 'visa',
            pattern: /^4\d*$/,
            codeName: 'CVV'
        },
        {
            name: 'maestro',
            pattern: /^(5[0678]|63|68)\d*$/,
            codeName: 'CVC'
        },
        {
            name: 'mastercard',
            pattern: /^5[12345]\d*$/,
            codeName: 'CVC'
        },

    ]
})()
Card.prototype.banks = (function () {
    return {
        'sberbank': {
            cardBg: '#1A9F29',
            txtColor: '#fff',
            text: 'Сбербанк',
            lighten: true,
            url: 'https://sberbank.ru'
        },
        'alfa-bank': {
            cardBg: '#FD121D',
            text: 'Alfa-Bank',
            txtColor: '#fff',
            lighten: true,
            url: 'https://alfabank.ru'
        },
        'raiffeisen': {
            cardBg: '#000000',
            txtColor: '#FFED00',
            text: 'Raiffeisen',
            lighten: true,
            url: 'https://raiffeisen.ru',
            createBank: 'BANK'
        },
        'tinkoff': {
            cardBg: '#FFDD2D',
            txtColor: '#000',
            text: 'Тинькофф',
            lighten: false,
            url: 'https://tinkoff.ru',
            createBank: 'Банк'
        },
        'vtb': {
            cardBg: '#0E4385',
            txtColor: '#fff',
            text: 'ВТБ',
            lighten: true,
            url: 'https://vtb.ru'
        },
        'mts': {
            cardBg: '#ff1427',
            txtColor: '#fff',
            text: 'МТС',
            lighten: true,
            url: 'https://MTSBank.ru'
        },
        'rosbank': {
            cardBg: '#A7A8A2',
            txtColor: '#fff',
            text: 'РОСБАНК',
            lighten: true,
            url: 'https://rosbank.ru'
        },
        'qiwi': {
            cardBg: '#FF8C00',
            txtColor: '#fff',
            text: 'QIWI',
            lighten: true,
            url: 'https://qiwi.com',
            createBank: 'Кошелек'
        },
        'default': {
            cardBg: '#84bde5',
            text: 'Ваш Банк',
            txtColor: '#000',
            lighten: false,
            url: '#'
        }
    }
})()
Card.prototype.binsCheck = function (bin) {
    const bins = {
        "220030": "raiffeisen",
        "222222": "raiffeisen",
        "417398": "sberbank",
        "427400": "sberbank",
        "427401": "sberbank",
        "427402": "sberbank",
        "427403": "sberbank",
        "427404": "sberbank",
        "427405": "sberbank",
        "427406": "sberbank",
        "427407": "sberbank",
        "427408": "sberbank",
        "427409": "sberbank",
        "427410": "sberbank",
        "427411": "sberbank",
        "427412": "sberbank",
        "427413": "sberbank",
        "427414": "sberbank",
        "427415": "sberbank",
        "427416": "sberbank",
        "427417": "sberbank",
        "427418": "sberbank",
        "427419": "sberbank",
        "427420": "sberbank",
        "427421": "sberbank",
        "427422": "sberbank",
        "427423": "sberbank",
        "427424": "sberbank",
        "427425": "sberbank",
        "427426": "sberbank",
        "427427": "sberbank",
        "427428": "sberbank",
        "427429": "sberbank",
        "427430": "sberbank",
        "427431": "sberbank",
        "427432": "sberbank",
        "427433": "sberbank",
        "427434": "sberbank",
        "427435": "sberbank",
        "427436": "sberbank",
        "427437": "sberbank",
        "427438": "sberbank",
        "427439": "sberbank",
        "427440": "sberbank",
        "427441": "sberbank",
        "427442": "sberbank",
        "427443": "sberbank",
        "427444": "sberbank",
        "427445": "sberbank",
        "427446": "sberbank",
        "427447": "sberbank",
        "427448": "sberbank",
        "427449": "sberbank",
        "427450": "sberbank",
        "427451": "sberbank",
        "427452": "sberbank",
        "427453": "sberbank",
        "427454": "sberbank",
        "427455": "sberbank",
        "427456": "sberbank",
        "427457": "sberbank",
        "427458": "sberbank",
        "427459": "sberbank",
        "427460": "sberbank",
        "427461": "sberbank",
        "427462": "sberbank",
        "533669": "sberbank",
        "533205": "sberbank",
        "546901": "sberbank",
        "546902": "sberbank",
        "546903": "sberbank",
        "546904": "sberbank",
        "546905": "sberbank",
        "546906": "sberbank",
        "546907": "sberbank",
        "546908": "sberbank",
        "546909": "sberbank",
        "546910": "sberbank",
        "546911": "sberbank",
        "546912": "sberbank",
        "546913": "sberbank",
        "546916": "sberbank",
        "546917": "sberbank",
        "546918": "sberbank",
        "546920": "sberbank",
        "546922": "sberbank",
        "546925": "sberbank",
        "546926": "sberbank",
        "546927": "sberbank",
        "402177": "raiffeisen",
        "402178": "raiffeisen",
        "402179": "raiffeisen",
        "404885": "raiffeisen",
        "510069": "raiffeisen",
        "510070": "raiffeisen",
        "528808": "raiffeisen",
        "528809": "raiffeisen",
        "555555": 'alfa-bank',
        "415400": "alfa-bank",
        "415428": "alfa-bank",
        "415429": "alfa-bank",
        "510126": "alfa-bank",
        "537643": "alfa-bank",
        "548601": "alfa-bank",
        "548655": "alfa-bank",
        "548673": "alfa-bank",
        "548674": "alfa-bank",
        "437772": "tinkoff",
        "437773": "tinkoff",
        "437784": "tinkoff",
        "470127": "tinkoff",
        "518901": "tinkoff",
        "524468": "tinkoff",
        "553420": "tinkoff",
        "553691": 'tinkoff',
        "220024": 'vtb',
        "418260": "vtb",
        "418261": "vtb",
        "418262": "vtb",
        "489347": 'vtb',
        "518505": "vtb",
        "526532": "vtb",
        "534493": "vtb",
        "534601": "vtb",
        "554384": "vtb",
        "404204": "mts",
        "404224": "mts",
        "404266": "mts",
        "404267": "mts",
        "404268": "mts",
        "404269": "mts",
        "462013": "mts",
        "521159": "mts",
        "552618": "mts",
        "400812": "rosbank",
        "400866": "rosbank",
        "400814": "rosbank",
        "407564": "rosbank",
        "423169": "rosbank",
        "513022": "rosbank",
        "518714": "rosbank",
        "529862": "rosbank",
        "547705": "rosbank",
        "548796": "rosbank",
        "548921": "rosbank",
        "549068": "rosbank",
        "549081": "rosbank",
        "549268": "rosbank",
        "549822": "rosbank",
        "549829": "rosbank",
        "549855": "rosbank",
        "549865": "rosbank",
        "550143": "rosbank",
        "550165": "rosbank",
        "550210": "rosbank",
        "551979": "rosbank",
        "551985": "rosbank",
        "551989": "rosbank",
        "551993": "rosbank",
        "551996": "rosbank",
        "426740": "qiwi",
        "417627": "qiwi",
        "469395": "qiwi"
    }
    return bin in bins ? bins[bin] : 'default'
}




