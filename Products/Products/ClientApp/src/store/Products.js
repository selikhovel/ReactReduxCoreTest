const requestProductsType = 'REQUEST_PRODUCTS';
const receiveProductsType = 'RECEIVE_PRODUCTS';
const initialState = { products: [], isLoading: false };

export const actionCreators = {
    requestProducts: startIndex => async (dispatch, getState) => {    
    if (startIndex === getState().products.startIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestProductsType, startIndex });

    const url = `api/Products/GetProducts?startIndex=${startIndex}`;
    const response = await fetch(url);
    const products = await response.json();

    dispatch({ type: receiveProductsType, startIndex, products });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProductsType) {
    return {
      ...state,
      startIndex: action.startIndex,
      isLoading: true
    };
  }

  if (action.type === receiveProductsType) {
    return {
      ...state,
      startIndex: action.startIndex,
      products: action.products,
      isLoading: false
    };
  }

  return state;
};
