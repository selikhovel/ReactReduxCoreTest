import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Products';
import ReactDataGrid from 'react-data-grid';

class FetchData extends Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.requestProducts(startIndex);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        const startIndex = parseInt(nextProps.match.params.startIndex, 10) || 0;
        this.props.requestProducts(startIndex);
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                {renderTable(this.props)}
                {renderPagination(this.props)}
            </div>
        );
    }
}

const BooleanFormatter = ({ value }) => {
    return value.toString();
};

const columns = [
    { key: 'productId', name: 'ID', sortDescendingFirst: true, sortable: true },
    { key: 'name', name: 'Name', sortable: true },
    { key: 'categoryName', name: 'Category', sortable: true },
    { key: 'isActive', name: 'Active', sortable: true, formatter: BooleanFormatter },
    { key: 'price', name: 'Price', sortable: true }];

var rows, initialRows = 0;

function renderTable(props) {
    initialRows = props.products;
    rows = props.products;
    return (<ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={5}
        minHeight={450}
        onGridSort={(sortColumn, sortDirection) => {
            rows = sortDirection === "NONE" ? initialRows : initialRows.sort((a, b) => {
                if (sortDirection === "ASC") {
                    return a[sortColumn] > b[sortColumn] ? 1 : -1;
                } else if (sortDirection === "DESC") {
                    return a[sortColumn] < b[sortColumn] ? 1 : -1;
                }
            });
        }
        }
        onRowDoubleClick={(row) => {
            rowDblClick(row, props)
        }} />)
};

const rowDblClick = (row, props) => {
    props.history.push(`/product/${rows[row].productId}`);
};



const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    const comparer = (a, b) => {
        if (sortDirection === "ASC") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    };
    return sortDirection === "NONE" ? initialRows : initialRows.sort(comparer);
};

/*
function renderTable(props) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Active</th>
                    <th>Price</th>

                </tr>
            </thead>
            <tbody>
                {props.products.map(product =>
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.name}</td>
                        <td>{product.categoryName}</td>

                        <td>{product.isActive.toString()}</td>
                        <td>{product.price}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}*/
//  
function renderPagination(props) {
    const prevstartIndex = (props.startIndex || 0) - 5;
    const nextstartIndex = (props.startIndex || 0) + 5;

    return <p className='clearfix text-center'>
        <Link className='btn btn-default pull-left' to={`/fetchdata/${prevstartIndex}`} disabled={props.startIndex <= 0}>Previous</Link>
        <Link className='btn btn-default pull-right' to={`/fetchdata/${nextstartIndex}`} disabled={props.products.length < 5}>Next</Link>
        {props.isLoading ? <span>Loading...</span> : []}
    </p>;
}

export default connect(
    state => state.products,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
