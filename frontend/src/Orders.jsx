import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders", { credentials: "include" })
      .then(res => res.json())
      .then(data => setOrders(data.data));
  }, []);

  if (!orders) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <h3 style={{ color: "#2e7d32" }}>Betöltés...</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4" style={{ color: "#2e7d32", fontWeight: 700 }}>Rendeléseim</h2>

      {orders.length === 0 && (
        <p style={{ textAlign: "center", color: "#555" }}>Még nincs rendelésed.</p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {orders.map(order => (
          <div
            key={order.order_id}
            style={{
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <p><strong>Dátum:</strong> {new Date(order.order_date).toLocaleString()}</p>
            <p><strong>Összeg:</strong> <span style={{ color: "#2e7d32", fontWeight: 600 }}>{order.total_price} Ft</span></p>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {order.products.map((p, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {p.name} - {p.quantity} db
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;