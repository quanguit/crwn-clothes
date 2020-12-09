import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import CartItems from '../cart-item/cart-item.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import { toggleCartHidden } from '../../redux/cart/cart-actions.js';

import { withRouter } from 'react-router-dom';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                (cartItems.map(cartItem => <CartItems key={cartItem.id} item={cartItem} />))
                :
                (<span className="empty-message">Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => { 
            history.push("/checkout");
            dispatch(toggleCartHidden()); 
        }}>
            GO TO CHECK
        </CustomButton>
    </div>
);

// thay otherProps bang dispatch => console.log ra thi co thuoc tinh do nen the vo luon


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


// const mapStateToProps = ({ cart: { cartItems } }) => ({
//     cartItems
// });

export default withRouter(connect(mapStateToProps)(CartDropdown));