import { fetchEndpoint } from '../../network/network'

export const addShopCart = (params) => fetchEndpoint('/v2/ecapi.cart.add', 'POST', params);

export const getCartTotal = (params) => fetchEndpoint('/v2/ecapi.cart.quantity', 'post', params);

export const getCartGroup = (params) => fetchEndpoint('/v2/ecapi.cart.get', 'POST', params);

export const deleteCart = (params) => fetchEndpoint('/v2/ecapi.cart.delete', 'POST', params);

export const updateCartQuantity = (params) => fetchEndpoint('/v2/ecapi.cart.update', 'post', params);

export const clearCart = (params) => fetchEndpoint('/v2/ecapi.cart.clear', 'post', params);

export const getCartPromos = (params) => fetchEndpoint('/v2/ecapi.cart.promos', 'post', params);

export const checkoutCart = (params) => fetchEndpoint('/v2/ecapi.cart.checkout', 'post', params);
