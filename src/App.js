import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { checkUserSession } from "./redux/user/user.actions";

const App = ({ checkUserSession, currentUser }) => {
  // google sign in
  // giống bên shop.component (ban đầu kiểm tra action User trước tiên)
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // khi checkUserSession kh thay đổi thì function App cũng kh cần update nên kh cần re-render
  // useEffect thay thế cho componentDidMount
  // trường hợp này pass vào của dispatchtoprops chứ kh phải của parent và vì app là parent lớn nhất nên dc

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
