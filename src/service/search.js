import { getKeywords} from '../api/search'

const PER_PAGE = 100

export function getData() {
	return getKeywords()
}