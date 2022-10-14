const required = document.querySelectorAll("[required]")

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault()
    required.forEach(element => {
        if (element.value == '') {
            element.nextSibling.nextSibling.classList.add("on")
            element.classList.add('border')
        }
    })
})