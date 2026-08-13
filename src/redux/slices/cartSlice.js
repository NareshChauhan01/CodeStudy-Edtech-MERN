import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,

  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

// Love ❤️
// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const course = action.payload
//             const index = state.cart.findIndex((item) => item._id === course._id)

//             if (index >= 0) {
//                 // If the course is already in the cart, do not modify the quantity
//                 toast.error("Course already in cart")
//                 return
//             }
//             // If the course is not in the cart, add it to the cart
//             state.cart.push(course)
//             // Update the total quantity and price
//             state.totalItems++
//             state.total += course.price
//             // Update to localstorage
//             localStorage.setItem("cart", JSON.stringify(state.cart))
//             localStorage.setItem("total", JSON.stringify(state.total))
//             localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
//             // show toast
//             toast.success("Course added to cart")
//         },

//         removeFromCart: (state, action) => {
//             const courseId = action.payload
//             const index = state.cart.findIndex((item) => item._id === courseId)

//             if (index >= 0) {
//                 // If the course is found in the cart, remove it
//                 state.totalItems--
//                 state.total -= state.cart[index].price
//                 state.cart.splice(index, 1)
//                 // Update to localstorage
//                 localStorage.setItem("cart", JSON.stringify(state.cart))
//                 localStorage.setItem("total", JSON.stringify(state.total))
//                 localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
//                 // show toast
//                 toast.success("Course removed from cart")
//             }
//         },

//         resetCart: (state) => {
//             state.cart = []
//             state.total = 0
//             state.totalItems = 0
//             // Update to localstorage
//             localStorage.removeItem("cart")
//             localStorage.removeItem("total")
//             localStorage.removeItem("totalItems")
//         },
//     },
// })


const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state, value) {
      state.cart = value.payload
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    setTotalAmount(state, value) {
      state.totalAmount = value.payload
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
    },

    setTotalItems(state, value) {
      state.totalItems = value.payload
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
    },

    resetCart: (state) => {
      state.cart = []
      state.totalAmount = 0
      state.totalItems = 0

      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("totalAmount")
      localStorage.removeItem("totalItems")
    },
  }
})

// export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export const { setCart, setTotalAmount, setTotalItems, resetCart } = cartSlice.actions

export default cartSlice.reducer