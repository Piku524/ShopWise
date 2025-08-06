import React, { useState } from "react";
import { toast } from "react-toastify";

export default function DummyPayment({ onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
      toast.error("Please enter valid payment details");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful! 🎉");
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 8, maxWidth: 400 }}>
      <h3>Dummy Payment</h3>
      <input
        type="text"
        placeholder="Card Number (16 digits)"
        value={cardNumber}
        maxLength={16}
        onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
        style={{ width: "100%", marginBottom: 10, padding: 8, fontSize: 16 }}
      />
      <input
        type="text"
        placeholder="Expiry (MM/YY)"
        value={expiry}
        maxLength={5}
        onChange={e => setExpiry(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8, fontSize: 16 }}
      />
      <input
        type="password"
        placeholder="CVV"
        value={cvv}
        maxLength={3}
        onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
        style={{ width: "100%", marginBottom: 10, padding: 8, fontSize: 16 }}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ width: "100%", padding: 10, fontSize: 18, cursor: "pointer" }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
