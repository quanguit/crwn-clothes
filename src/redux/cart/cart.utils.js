export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }
    // ... tức là biểu diễn nhiều object sp dc chọn
    // ban đầu cartItems là mảng trống nhưng khi mình thêm sp vô thì vẫn in ra mảng trống và sp đó chưa
    // thêm vô liền (cho nên cần []). Không thêm '...' trước cartItems thì in ra [{…}] nhưng sai cú pháp
    // vì bên trong là sp mới thêm vô có dạng 0: {cartItemToAdd: {…}, quantity: 1} và chưa thêm sp vô liền. 
    // Sau khi '...' xong thì đã thêm vô mảng được liền nhưng in ra đối tượng chưa tương thích là
    // 0: {cartItemToAdd: {…}, quantity: 1} (cho nên thêm '...' trước cartItemToAdd để nó thành
    // 0: {id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, quantity: 1})
    // vậy là xong
    // b1: cartItems, {cartItemToAdd, quantity:1 }
    // b2: [cartItems, {cartItemToAdd, quantity:1 }]
    // b3: [...cartItems, {cartItemToAdd, quantity:1 }]
    // b4: [...cartItems, {...cartItemToAdd, quantity:1 }]
    // console.log([...cartItems, {...cartItemToAdd, quantity:1 }]);
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1) {
        // hàm filter dùng để xóa sp
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
};