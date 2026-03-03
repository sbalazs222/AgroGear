import { Card, Typography, Button, IconButton } from '@mui/material';


function Cart({ cartItems, removeFromCart, checkout }) {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4" style={{ color: "#2e7d32" }}>Kosaram</h2>
            {cartItems.length === 0 ? (
                <div className="text-center py-5">
                    <p className="fs-4 text-muted">A kosarad jelenleg üres.</p>
                    <Button variant="contained" color="success" href="/">Vásárlás megkezdése</Button>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        {cartItems.map(item => (
                            <Card key={item.id} className="agro-card mb-3 p-3 d-flex align-items-center justify-content-between">
                                <div>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                                    <Typography color="text.secondary">{item.quantity} x {item.price.toLocaleString()} Ft</Typography>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 800 }}>{(item.price * item.quantity).toLocaleString()} Ft</Typography>
                                    <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                        ❌
                                    </IconButton>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        <div className="p-4 bg-white agro-card shadow-sm sticky-top" style={{ top: "100px" }}>
                            <h4>Összegzés</h4>
                            <hr />
                            <div className="d-flex justify-content-between fs-5 mb-4">
                                <span>Végösszeg:</span>
                                <span className="fw-bold text-success">{totalPrice.toLocaleString()} Ft</span>
                            </div>
                            <Button fullWidth variant="contained" color="success" size="large" onClick={checkout} sx={{ borderRadius: "30px", py: 1.5, fontWeight: 700 }}>
                                Rendelés leadása
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Cart;