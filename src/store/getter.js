export const isOnline = (state) => {
  return state.auth.isOnline
}

export const token = (state) => {
  return state.auth.token
}

export const getUser = (state) => {
  return state.auth.user
}
