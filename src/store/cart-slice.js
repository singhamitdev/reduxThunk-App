import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { items: [], totalQty: 0, changed: false };
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQty = action.payload.totalQty;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload; // adding extra item sent using payload along with the action
      const existingItem = state.items.find((item) => item.id === newItem.id); // checking if newItem is already part of Items
      state.totalQty++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          // if newItem is not part of existing item the adding it to items array using Push Method,
          id: newItem.id,
          price: newItem.price,
          qty: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        //we are not manipulating data here as redux handle it.
      } else {
        existingItem.qty++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload; // getting id of the item to be removed using payload
      const existingItem = state.items.find((item) => item.id === id); ///checking for the item eetails using Id
      state.totalQty--;
      state.changed = true;
      if (existingItem.qty === 1) {
        // if qty of item is one then we need to remove item form the list
        state.items = state.items.filter((item) => item.id !== id); // filtering out the item using its id.It will return items array with filtered value where the removed id will not be present.
      } else {
        existingItem.qty--; // if qty is more than 1 then only decreasing the qty and price.
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
