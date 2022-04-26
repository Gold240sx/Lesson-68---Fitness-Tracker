//DOM Elements
const btns = document.querySelectorAll('button')
const form = document.querySelector('form')
const formAct = document.querySelector('form span')
const input  = document.querySelector('input')
const error = document.querySelector('.error')

var activity = 'cycling'

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        //get activity
        activity = e.target.dataset.activity

        //set class to selected activity
        btns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')

        //set id of input field
        input.setAttribute('id', activity)
        
        //set txt of form span
        formAct.textContent = activity
    })
})