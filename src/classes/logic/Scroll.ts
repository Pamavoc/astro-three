import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import mitt from 'mitt';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'

export default class Scroll {
	
	emitter: any
	lenis: any

	constructor() {
		gsap.registerPlugin(ScrollTrigger);

		this.emitter = mitt()
		
		
		this.lenis = new Lenis({
			duration: 1.8,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
			direction: 'vertical', // vertical, horizontal
			gestureDirection: 'vertical', // vertical, horizontal, both
			smooth: true,
			mouseMultiplier: 1,
			smoothTouch: false,
			touchMultiplier: 2,
			infinite: false,
		  })
		  
		//console.log(this.lenis)
	}

	contact() {
		const contact = document.querySelector('.contact-section');
		const mail = new SplitType('.mail', { types: 'chars' })
		const social = document.querySelectorAll('.social div');

		const tl = gsap.timeline({ 
			scrollTrigger: {
				trigger: contact,
				start: "top center",
				toggleActions: "play none none reverse",
			}
		})

		tl.from(mail.chars, {
			opacity: 0,
			y: 50,
			ease: "back(4)",
			stagger: {
			  from: "center",
			  each: 0.04,
			},
		}, 0);

		tl.fromTo('.arrow_left', { opacity: 0 }, { duration: 0.4, ease: "power2.out" }, 1)
		tl.fromTo('.arrow_right', { opacity: 0 }, { duration: 0.4, ease: "power2.out" }, 1)
		tl.fromTo(social, { opacity: 0, y: 20}, { stagger: { from: "start", each: 0.04 }}, 1)
	}

	addTimeline(section, index) {

		//const { $emitter } = useNuxtApp()

		// console.log(section)
	
		let icons, title, description, separator, metaball, btnRed, split, splitDesc, mask_container;
		// const emitter = useEmitter()

		if(section.dataset.name === "creations") {
			
			icons = section.querySelectorAll('.icon');
		}

		if(section.dataset.name === "mask") {
			mask_container = section.querySelector('#mask_container');

		}

		if(section.dataset.name === "presentation") { 
			metaball = section.querySelector('.metaball');
		}

		if(section.dataset.name === "presentation" || section.dataset.name === "projects" || section.dataset.name === "parcours") {
			title = section.querySelector('.title');
			separator = section.querySelectorAll('.separator');			
			split = new SplitType(title, { types: 'chars' })
		}

		if(section.dataset.name === "projects") { 
			btnRed = section.querySelector('.btn_circle_red');
		}

		if(section.dataset.name === "parcours") {
			description = section.querySelector('.description');
			splitDesc = new SplitType(title, { types: 'words' })
		}


	
		const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "top center",
          // end: "top top",
          toggleActions: "play none none reverse",
		  onEnter: () => {
			if(btnRed)  {
				this.emitter.emit('appearProjects')
			}

			if(section.dataset.name === "mask") { 
				this.emitter.emit('WebGLcanvasEvent', 'appearLightBackground')

			}

		  },
		  onEnterBack: () => {
			if(btnRed)  {
				this.emitter.emit('appearProjects')
				this.emitter.emit('WebGLcanvasEvent', 'appearLightBackground')
			}
		  },
		  onLeave: () => { 
			if(btnRed)  {
				this.emitter.emit('disappearProjects')
				this.emitter.emit('WebGLcanvasEvent', 'disappearLightBackground')
			}
			},
		  onLeaveBack: () => {
			if(btnRed)  {
				this.emitter.emit('disappearProjects')
				this.emitter.emit('WebGLcanvasEvent', 'disappearLightBackground')
			}
		  }
		}
      })


	  if(metaball) {
			// tl.to('canvas', {opacity: 0.5, duration: 0.8, ease: "power4.out"}, 0)
			tl.fromTo(metaball, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.4, ease: "power4.out"}, 0)
		
		}

		if(mask_container) { 

			tl.to(mask_container, {"--width-mask": "40vh", duration: 0.4, ease: "power4.out"}, 0);
			tl.to(mask_container, {"--height-mask": "40vh", duration: 0.4, ease: "power4.out"}, 0);
		}


	  if(separator) {
			tl.fromTo(separator[0], {width: 0}, {width: "100%", duration: 0.4}, 0)
			tl.fromTo(separator[1], {width: 0}, {width: "100%", duration: 0.2}, 0)
	 	}
			
		if(icons) {
			console.log(icons)
			tl.from(icons, {
				opacity: 0,
				y: -50,
				ease: "expo.inOut",
				stagger: {
				  from: "start",
				  each: 0.09,
				},
			  }, 0);
		}
	


	if (title) {
    tl.from(
      split.words,
      {
        opacity: 0,
        y: 50,
        ease: "back(4)",
        stagger: {
          from: "start",
          each: 0.04,
        },
      },
      0
    );
  }

	  if(splitDesc) {
		tl.from(splitDesc.words, {
			opacity: 0,
			y: 50,
			ease: "back(2)",
			stagger: {
			  from: "start",
			  each: 0.02,
			},
		}, 0.2);	
	  }
	  
	  if(btnRed) {
		tl.fromTo(btnRed, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.4, ease: "power4.out"}, 0.2)

	  }
	}


	raf = (time) => {
		this.lenis.raf(time)
		//requestAnimationFrame(this.raf)
	}
}