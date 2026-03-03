import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  CardActionArea, 
  CardActions,
  Grid, 
  Box,
  Container 
} from '@mui/material';
import Form from 'react-bootstrap/Form';

function Home({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("mezogazdasagigepek");

    async function fetchProducts(category) {
        if (!category) return;
        try {
            const res = await fetch(`http://localhost:3000/products/category/${category}`, { 
                credentials: "include" 
            });
            const json = await res.json();
            if (res.ok) setProducts(json.data);
            else { setProducts([]); }
        } catch (error) {
            setProducts([]);
        }
    }

    useEffect(() => { fetchProducts(selectedCategory); }, [selectedCategory]);

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#2e7d32", mb: 2 }}>
                    Kínálatunk
                </Typography>
                <Form.Select
                    className="shadow-sm mx-auto"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ maxWidth: "400px", borderRadius: "25px", padding: "12px 20px" }}
                >
                    <option value="mezogazdasagigepek">🚜 Mezőgazdasági gépek</option>
                    <option value="kerteszetieszkozok">✂️ Kertészeti eszközök</option>
                    <option value="ontozorendszerek">💧 Öntözőrendszerek</option>
                </Form.Select>
            </Box>

            {/* MUI GRID HASZNÁLATA: spacing=4 a kártyák közti távolság */}
            <Grid container spacing={4}>
                {products.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary">Nincs megjeleníthető termék.</Typography>
                    </Grid>
                ) : (
                    products.map(product => (
                        /* xs=12 (mobil: 1 oszlop), md=6 (tablet: 2 oszlop), lg=4 (asztali: 3 oszlop) */
                        <Grid item xs={12} md={6} lg={4} key={product.id}>
                            <Card 
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    borderRadius: "20px",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                                    transition: "0.3s",
                                    "&:hover": { transform: "translateY(-10px)", boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={product.image_url || 'https://via.placeholder.com/400x220?text=AgroGear'}
                                        alt={product.name}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" sx={{ fontWeight: 700, color: "#2e7d32" }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: "40px" }}>
                                            {product.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1b5e20" }}>
                                                {product.price.toLocaleString()} Ft
                                            </Typography>
                                            <Typography variant="caption" sx={{ bgcolor: "#e8f5e9", px: 1, borderRadius: "5px", color: "#2e7d32" }}>
                                                Raktár: {product.stock}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ p: 2, mt: 'auto' }}>
                                    <Button 
                                        fullWidth 
                                        variant="contained" 
                                        color="success" 
                                        onClick={() => addToCart(product)}
                                        sx={{ borderRadius: "12px", fontWeight: 700, textTransform: "none", py: 1 }}
                                    >
                                        Kosárba teszem 🛒
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}

export default Home;