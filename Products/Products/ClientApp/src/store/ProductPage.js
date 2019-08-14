const requestProductType = 'REQUEST_PRODUCT';
const receiveProductType = 'RECEIVE_PRODUCT';
const changePropertyNameType = 'CHANGE_PROPERTY_NAME';
const changePropertyActiveType = 'CHANGE_PROPERTY_ACTIVE';
const changePropertyPriceType = 'CHANGE_PROPERTY_PRICE';
const changePropertyCategoryType = 'CHANGE_PROPERTY_CATEGORY';
const savedProductType = 'SAVE_PRODUCT';

const initialState = { product: [], categories: [], hasChanged: false };

const loadProduct = async (dispatch, index) => {

    dispatch({ type: requestProductType, index });

    var url = `api/Products/GetProduct?id=${index}`;
    var response = await fetch(url);
    const product = await response.json();

    url = `api/Categories/GetAll`;
    response = await fetch(url);
    const categs = await response.json();
    const categories = categs.map(category => ({ value: category.categoryId, label: category.name }));;


    dispatch({ type: receiveProductType, index, product, categories });
}



export const actionCreators = {
    requestProduct: index => async (dispatch, getState) => {
        if (index === getState().product.index) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        loadProduct(dispatch, index);
    },

    discardProduct: index => async (dispatch) => {
        loadProduct(dispatch, index);
    },


    saveProduct: product => async (dispatch) => {

        const url = `api/Products/UpdateProduct`;

        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
        dispatch({ type: savedProductType });
    },

    changeName: name =>
        async (dispatch) => {
            dispatch({ type: changePropertyNameType, name });
        },
    changeActive: isActive =>
        async (dispatch) => {

            dispatch({ type: changePropertyActiveType, isActive });
        },
    changePrice: price =>
        async (dispatch) => {
            dispatch({ type: changePropertyPriceType, price });
        },
    changeCategory: (categoryId, categoryName) =>
        async (dispatch) => {
            dispatch({ type: changePropertyCategoryType, categoryId, categoryName });
        },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestProductType) {
        return {
            ...state,
            index: action.index,
            product: [],
            categories: [],
            hasChanged: false
        };
    }

    if (action.type === receiveProductType) {
        return {
            ...state,
            index: action.index,
            product: action.product,
            categories: action.categories,
            hasChanged: false
        };
    };
    if (action.type === changePropertyNameType) {
        var product = state.product;
        product.name = action.name;
        return {
            ...state,
            index: state.index,
            product: product,
            categories: state.categories,
            hasChanged: true,
        };
    }
    if (action.type === changePropertyActiveType) {
        var product = state.product;
        product.isActive = action.isActive;
        return {
            ...state,
            index: state.index,
            product: product,
            categories: state.categories,
            hasChanged: true,
        };
    }
    if (action.type === changePropertyPriceType) {
        var product = state.product;
        product.price = action.price;
        return {
            ...state,
            index: state.index,
            product: product,
            categories: state.categories,
            hasChanged: true,
        };
    }

    if (action.type === changePropertyCategoryType) {
        var product = state.product;
        product.categoryId = action.categoryId;
        product.categoryName = action.categoryName;
        return {
            ...state,
            index: state.index,
            product: state.product,
            categories: state.categories,
            hasChanged: true,
        };
    }

    if (action.type === savedProductType) {
        return {
            ...state,
            index: state.index,
            product: state.product,
            categories: state.categories,
            hasChanged: false,
        };
    }



    return state;
}