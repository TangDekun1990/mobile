import * as types from './types'

// 检测所有的 state 并把 `initState()` 中的属性重置
function resetState(state, moduleState) {
	const mState = state[moduleState];
	if (mState.initState && typeof mState.initState === 'function') {
		const initState = mState.initState();
		for (const key in initState) {
			mState[key] = initState[key];
		}
	}
}

export default {
	[types.RESET_STATES](state, payload) {
		for (const moduleState in state) {
			resetState(state, moduleState);
		}
	},
}
