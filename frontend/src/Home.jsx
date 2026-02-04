import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

function Home() {
    const [products, setProducts] = useState([])

    async function fetchProducts() {
        const res = await fetch("http://localhost:3000/auth/products")
        const data = await res.json()
        if(res.ok){
            setProducts(data)
        }
    }
    
    useEffect(() => {
        fetchProducts();
      }, [])

    return (
        <>
            <h1>Kezdőlap</h1>
            {products.map(products => (
                <>
                    <Card sx={{ maxWidth: 345 }} key={products.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image=""
                                alt={products.name}
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    {products.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {products.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {products.price}
                                    {products.stock}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Kosárba
                            </Button>
                        </CardActions>
                    </Card>
                </>
            ))}
        </>
    )
}

export default Home;