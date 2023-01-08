import RAF from '@/classes/webgl/utils/RAF'

let raf: RAF | null = null

const useRAF = () => {
	return raf || (raf = new RAF())
}

export default useRAF
