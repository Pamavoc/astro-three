import Audio from '@/classes/managers/Audio';

let audio: Audio | null = null

const useAudio = () => {
	return audio || (audio = new Audio())
}
export default useAudio
