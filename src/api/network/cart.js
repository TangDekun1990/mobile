import { fetchEndpoint } from '../../network/network'

export const addShopCart = (params) => fetchEndpoint('/v2/ecapi.cart.add', 'POST', params);

export const getCartTotal = () => fetchEndpoint('/v2/ecapi.cart.quantity', 'post');

export const getCartGroup = (params) => fetchEndpoint('/v2/ecapi.cart.get', 'POST', params);

// export const getSearch = (params) => fetchEndpoint('/v2/ecapi.search.product.list', 'POST', params);

// export const getProductDetail = (product) => fetchEndpoint('/v2/ecapi.product.get', 'post', {'product': product});

// export const getReviewList = (params) => fetchEndpoint('/v2/ecapi.review.product.list', 'post', params);

// export const getReviewsubtotal = (product) => fetchEndpoint('/v2/ecapi.review.product.subtotal', 'post', {'product': product});

// export const getRecommendProduct = (params) => fetchEndpoint('/v2/ecapi.recommend.product.list', 'post', params);
