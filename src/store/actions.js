import * as types from './types'
export default {
	resetStates:function (context, payLoad) {
        context.commit(types.RESET_STATES, payLoad);
    }
}
