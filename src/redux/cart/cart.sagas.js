import { call, put, takeLatest, all } from "redux-saga/effects";

// import CartActionTypes from './cart.types';

import UserActionTypes from "../user/user.types";

import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}

// Saga này thực hiện khi SIGN OUT thành công sẽ xóa tất cả CART khi mở CTRL + P
// (TH đầu 2 cái CART và USER)
