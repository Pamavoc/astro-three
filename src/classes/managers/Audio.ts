import { Howl, Howler } from 'howler';

export default class Audio {
	sounds: Object

	constructor() {
		this.load()
	}


	start(){
		this.play('sound_intro')
	}

	load() {
		this.sounds = {
			// sound_intro: new Howl({
			// 	src: ['/sounds/sound-reco.mp3'],
			// }),
			ambient: new Howl({
				src: ['/sounds/ambiance_ile.mp3'],
        		loop: true,
        		volume: 0.2
			}),
			sound_objectFound: new Howl({
				src: ['/sounds/interaction_objet.mp3'],
        volume: 0.5
			}),
			sound_timesUp: new Howl({
				src: ['/sounds/alerte_temps.mp3'],
			}),
		}
	}

	play(sound: string) {
		this.sounds[sound].play()
	}

	stop(sound: string) {

		this.sounds[sound].stop()
	}

	mute(sound: string) {
		this.sounds[sound].stop()
	}

	pause(sound: string) {	
		this.sounds[sound].pause()
	}
}
