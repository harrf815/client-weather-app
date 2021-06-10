
console.log('Client side javescript file')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value 

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+ location)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                messageOne.innerText = data.error
            } else {
                messageOne.innerText = data.location
                messageTwo.innerText = data.forecast
            }
        })
            
})  