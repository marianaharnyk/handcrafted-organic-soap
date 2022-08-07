(function () {
    const faqs = document.querySelectorAll(".faq__wrapper");

    faqs.forEach((faq) => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('active')
        })
    })
    
})()