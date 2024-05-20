$(document).ready(() => {

    const headerBtns = document.querySelectorAll('.header_nav--btn')

    //-------------Functions--------------//

    $.fn.toggleAttr = function(attr, val1, val2) {
        return this.each(function() {
            let $this = $(this);

            if($this.attr(attr) == val1) {
                $this.attr(attr, val2);
            } else {
                $this.attr(attr, val1);
            }
        })
    }

    const fetchData = (index = 0) => {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {

            const planet = document.querySelector('.planet')
            planet.setAttribute('src', data[index].images.planet)

            const geology = document.querySelector('.geology')
            geology.setAttribute('src', data[index].images.geology)

            const planetName = document.querySelector('.planet-name')
            planetName.textContent = data[index].name

            const planetText = document.querySelector('.planet-text')
            planetText.textContent = data[index].overview.content

            const sourceLink = document.querySelector('.source-link')
            sourceLink.setAttribute('href', data[index].overview.source)

            const rotation = document.querySelector('.rotation')
            rotation.textContent = data[index].rotation

            const revolution = document.querySelector('.revolution')
            revolution.textContent = data[index].revolution

            const radius = document.querySelector('.radius')
            radius.textContent = data[index].radius

            const temp = document.querySelector('.temp')
            temp.textContent = data[index].temperature
        })
    }   

    

  



    //-------------Event Listeners--------------//
    $('.menu').on('click', (e) => {
        $(e.currentTarget).toggleAttr('aria-expanded', 'false', 'true')
        $('nav').toggleClass('open')
    })

    headerBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            fetchData(i);
            $('nav').toggleClass('open');
        })
        
    })

    
        
    

    fetchData();
})