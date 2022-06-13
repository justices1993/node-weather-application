

const form  = document.querySelector('form')
const searchE1 = document.querySelector('input')
const message1 = document.querySelector('.msg1')
const message2 = document.querySelector('.msg2')
const message3 = document.querySelector('.msg3')
const icon = document.querySelector('.icon')

form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const search = searchE1.value
    message1.textContent = 'Searching...'
    message2.textContent = ''

    fetch('/weather?search='+ search + '').then((response)=> {
        response.json().then((data)=> {
            if(data.error){
                message1.textContent = data.error
            }else {
                message1.textContent = data.location
                message2.textContent = data.country
                message3.textContent = data.temperature
                icon.textContent = data.icon
                console.log(data.seearch)
            }
        })
    }).catch((e)=> console.log({e}))
})