import fetch from '../config/axios'

export const cityGuess = () => fetch('/v2/ecapi.category.list', 'post', {
	'page': 1, 
	'per_page': 10, 
	'category': 'fururfur', 
	'shop': 'ufhruhfruhur'
});