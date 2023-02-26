import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Sending",
        title: "sending..",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-b680e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({ items: cart.items, totalQty: cart.totalQty }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed..");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "Success!",
          title: "Success..",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "error..",
          message: "error in sending cart data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b680e-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("could not fetch data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQty: cartData.totalQty,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "error..",
          message: "error in sending cart data",
        })
      );
    }
  };
};
