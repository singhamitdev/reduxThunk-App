import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.uiReducer.cartIsVisible);
  const cart = useSelector((state) => state.cartReducer);
  const notification = useSelector((state) => state.uiReducer.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  // commented codes are an alternative way of handling request and sending data to database and dispatchng actions, error , notifications all are managed in component itself..,
  //but we have used Redux thunk here ,which is written in cart-actions file to handle the same thing.. We are using action creaters to send requests and handle notifications and action dispatchs.
  useEffect(() => {
    // const sendCart = async () => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "Sending",
    //     title: "sending..",
    //     message: "sending cart data",
    //   })
    // );
    //   const response = await fetch(
    //     "https://react-http-b680e-default-rtdb.firebaseio.com/cart.json",
    //     { method: "PUT", body: JSON.stringify(cart) }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Sending cart data failed..");
    //   }
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Success!",
    //       title: "Success..",
    //       message: "Sent cart data successfully",
    //     })
    //   );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // sendCart().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Error",
    //       title: "error..",
    //       message: "error in sending cart data",
    //     })
    //   );
    // });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
