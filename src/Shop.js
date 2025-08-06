import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "./cartSlice";
import DummyPayment from "./DummyPayment";
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export default function Shop({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addItem = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart.");
  };

  const handleOrderClick = () => {
    if (cartItems.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }
    setShowPayment(true);
  };

  const onPaymentSuccess = async () => {
    try {
      if (!user) {
        toast.error("User not logged in.");
        return;
      }

      const order = {
        items: cartItems,
        total: totalPrice.toFixed(2),
        userEmail: user.email,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);

      dispatch(clearCart());
      setShowPayment(false);
      toast.success("✅ Order placed and saved!");
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("❌ Failed to save order.");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50, fontSize: 20 }}>
        Loading products...
      </div>
    );

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#333" }}>
        ShopWise Store
      </h1>

      <h2>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 20,
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ height: 120, objectFit: "contain", marginBottom: 10 }}
            />
            <h4 style={{ minHeight: 48 }}>{p.title.slice(0, 40)}...</h4>
            <p
              style={{
                fontWeight: "bold",
                fontSize: 16,
                margin: "10px 0",
                color: "#007bff",
              }}
            >
              ${p.price.toFixed(2)}
            </p>
            <button
              onClick={() => addItem(p)}
              style={{
                padding: "8px 12px",
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Cart ({cartItems.length})</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            borderBottom: "1px solid #eee",
            paddingBottom: 8,
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: 6,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <div>
            {item.title.slice(0, 40)} x {item.quantity}
          </div>
          <div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <>
          <h3 style={{ marginTop: 15 }}>
            Total:{" "}
            <span style={{ color: "#007bff" }}>${totalPrice.toFixed(2)}</span>
          </h3>
          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: 6,
                cursor: "pointer",
                marginRight: 10,
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={handleOrderClick}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}

      {showPayment && <DummyPayment onPaymentSuccess={onPaymentSuccess} />}
    </div>
  );
}
