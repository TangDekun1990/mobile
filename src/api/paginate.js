
export function loadItems(call_api, isFirstPage, filter) {
  return (dispatch, state) => {
    let page, paged;
    if (isFirstPage) {
      page = 1;
      let params = populateParams(call_api, page);
      return dispatch(fetchItemList(params, isFirstPage, filter));
    } else {
      let info = getStateByEndpoint(getState(), call_api.endpoint);
      let pagination = info[filter];
      if (pagination) {
        paged = pagination.paged;
        page = parseInt(paged.page) + 1;
        if (paged && paged.more) {
          let params = populateParams(call_api, page);
          return dispatch(fetchItemList(params, isFirstPage, filter));
        }
      }
    } 
  } 
}

/** 填充列表的请求参数：page、per_page；填充示例如下：
{
  types: actionTypes,
  endpoint: endpoint,
  method: method,
  params: {
    "param1": param1,
    "param2": param2,
}
=>
{
  types: actionTypes,
  endpoint: endpoint,
  method: method,
  params: {
    "param1": param1,
    "param2": param2,
    "page": page,
    "per_page": 10,
}
*/
function populateParams(call_api, page) {
  let params = call_api.params;
  params.page = page; // 当前页码
  params.per_page = 10; // 每页个数
  let types = fetchItemActionTypes(call_api.endpoint);
  let api_params = {
    types: types,
    endpoint: call_api.endpoint,
    method: call_api.method,
    params: params
  };
  return api_params;
}

function fetchItemList(call_api, isFirstPage, filter) {
  return {
    isFirstPage,
    filter, // 列表对应的标识
    [CALL_API]: call_api
  };
}