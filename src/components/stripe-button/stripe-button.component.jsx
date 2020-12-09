import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HwK6lI1XWSkPuvU1Qa0AfNlpSwiskH1hAgaalPmJo07gHhnLcIpYxatwwa73lkM4TXUfmuLUkvMNtSIeUu7iEJw00TlThGNQN';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    }

    return(
        <StripeCheckout
            label='Pay now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;