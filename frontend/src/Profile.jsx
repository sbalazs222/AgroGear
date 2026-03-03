import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/user/data", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.data.length > 0) {
          setUser(data.data[0]);
        }
      });
  }, []);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <h3 style={{ color: "#2e7d32" }}>Betöltés...</h3>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center py-5">
      <div style={{
        width: "100%",
        maxWidth: "500px",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9"
      }}>
        <h2 className="text-center mb-4" style={{ color: "#2e7d32", fontWeight: 700 }}>Profil</h2>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#555" }}>Felhasználónév: </strong>
          <span style={{ fontWeight: 600, color: "#2e7d32" }}>{user.username}</span>
        </div>

        {user.email && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Email: </strong>
            <span style={{ fontWeight: 500 }}>{user.email}</span>
          </div>
        )}

        {user.created_at && (
          <div>
            <strong style={{ color: "#555" }}>Regisztráció dátuma: </strong>
            <span style={{ fontWeight: 500 }}>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;