import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ProductPage';
import SaveBar from '../components/SaveBar';
import Select from 'react-select';
import { createNotification, NOTIFICATION_TYPE_SUCCESS } from 'react-redux-notify';
import { Notify } from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';

const mySuccessNotification = {
    message: 'Product Saved!',
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 0,
    canDismiss: true,
    icon: <i className="fa fa-check" />
}


//var product;

class ProductPage extends Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        const index = parseInt(this.props.match.params.index, 10) || 0;
        this.props.requestProduct(index);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change

        const index = parseInt(nextProps.match.params.index, 10) || 0;
        if (index === parseInt(this.props.match.params.index))
            return;
        this.props.requestProduct(index);
    }

    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.props.changeCategory(selectedOption.value, selectedOption.label);
        console.log(`Option selected:`, selectedOption);
    };

    handleClick() {
        mySuccessNotification.message = 'Product Saved! ID:' + this.props.product.productId;
        this.props.notify(mySuccessNotification);
    }

    render() {
        var { selectedOption } = [];
        const catId = this.props.product.categoryId;
        if (this.props.categories != null) {
            const categs = this.props.categories;
            selectedOption = categs.filter(function(obj) {
                return obj.value === catId;
            })[0];
        };


        return (
            <div>
                <h1>Product Editor ID: {this.props.product.productId}</h1>
                <div className="col-md-8 col-md-offset-2">
                    <div>
                        <br />
                        Name
                        <br />
                        <input type="text" value={this.props.product.name}
                            onChange={(event) => {
                                this.props.changeName(event.target.value);
                            }} />
                        <br />
                    </div>
                    <div>
                        <br />
                        Category
                        <br />
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.props.categories}
                        />
                        <br />
                    </div>

                    <div>
                        <br />
                        Active
                        <br />
                        <input type="checkbox" checked={this.props.product.isActive} onChange={(event) => {
                            this.props.changeActive(!this.props.product.isActive);
                        }} />
                        <br />
                    </div>
                    <div>
                        <br />
                        Price
                        <br />
                        <input type="number" pattern="[0-9]+([\.,][0-9]+)?" title="This should be a number with up to 2 decimal places." step="0.01" value={this.props.product.price} onChange={(event) => { this.props.changePrice(event.target.value); }} />
                        <br />
                    </div>
                    <Notify />

                    <SaveBar
                        onDiscardAction={() => {
                            const index = parseInt(this.props.match.params.index, 10) || 0;
                            this.props.discardProduct(index);
                        }}
                        open={this.props.hasChanged}
                        onSaveAction={() => {
                            this.props.saveProduct(this.props.product);
                            this.handleClick();
                        }}
                    />
                </div >
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actionCreators, dispatch),
    notify: (config) => {
        dispatch(createNotification(config));
    },
})

export default connect(
    state => state.product,
    dispatch => 
        mapDispatchToProps(dispatch)
   
    
)(ProductPage);
