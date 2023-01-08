import Animations from '@/classes/managers/Animations';

let animations: Animations | null = null

const useAnimations = () => {
	return animations || (animations = new Animations())
}

export default useAnimations