import Scroll from '@/classes/logic/Scroll'

let scroll: Scroll | null = null

const useScroll = () => {
	return scroll || (scroll = new Scroll())
}

export default useScroll