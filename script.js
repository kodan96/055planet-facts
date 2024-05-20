$(document).ready(() => {

    const headerBtns = document.querySelectorAll('.header_nav--btn')
    const toggleBtns = document.querySelectorAll('.toggle-btn')
    let planetData = null;
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

            planetData = data;

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

    const navAnimation = () => {
        const tl = gsap.timeline()
        const nav = $('nav')
        const navIsOpen = nav.hasClass('open')
        const navItem = $('.nav_list-item')
         
        if(!navIsOpen) {
            nav.addClass('open')
            tl.to(navItem, {
                duration: 0.5,
                y: 0,
                opacity: 1,
                stagger: 0.2
            }) 
        } else {
            tl.to(navItem, {
                duration: 0.5,
                y: '-100%',
                opacity: 0,
                stagger: 0.2
            })
            nav.removeClass('open')
        }
    }

    const getActiveBtnIndex = () => {
        const activeBtn = $('.header_nav--btn.active');
        const index = $('.header_nav--btn').index(activeBtn);

        return index;
    }

    const updateSections = (index) => {
        
        const activeIndex = getActiveBtnIndex();
        const keys = ['planet', 'internal', 'planet'];
        const sections = ['overview', 'structure', 'geology'];
        const planetText = document.querySelector('.planet-text');
        const sourceLink = document.querySelector('.source-link');
        const planet = document.querySelector('.planet')
        const updateAnim = $('.update-anim');
        const tl = gsap.timeline();

        
        
        const section = sections[index];

        planetText.textContent = planetData[activeIndex][section].content
        sourceLink.setAttribute('href', planetData[activeIndex][section].source)
        planet.setAttribute('src', planetData[activeIndex].images[keys[index]])
        
        tl.to(updateAnim, {
            duration: 0.5,
            opacity: 1,
            stagger: 0.2

            
        })

        if(toggleBtns[2].classList.contains('toggled')) {
            tl.to('.geology', {
                duration: 0.5,
                opacity: 1,
                stagger: 0.2,
            }, 0)
        } else {
            tl.to('.geology', {
                duration: 0.5,
                opacity: 0,
                
            }, 0)
        }

       

        
    }

    

  



    //-------------Event Listeners--------------//
    $('.menu').on('click', (e) => {
        $(e.currentTarget).toggleAttr('aria-expanded', 'false', 'true')
        navAnimation();
    })

    headerBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            $(headerBtns).removeClass('active')
            $(btn).addClass('active')
            $(headerBtns).attr('aria-expanded', 'false')
            $(btn).toggleAttr('aria-expanded', 'false', 'true')

            
            fetchData(i);
            navAnimation()
        })
        
    })

    toggleBtns.forEach((btn, i) => {
       
        btn.addEventListener('click', () => {
            tl = gsap.timeline();
            $(toggleBtns).removeClass('toggled')
            $(btn).addClass('toggled')
            $(btn).toggleAttr('aria-expanded', 'false', 'true')
            const updateAnim = $('.update-anim');
            tl.to(updateAnim, {
                duration: 0.5,
                opacity: 0,
                stagger: 0.2,
                onComplete: () => {
                    updateSections(i);
                }
            })
            
            
        })

       

    })

   

    
        
    

    fetchData();
})