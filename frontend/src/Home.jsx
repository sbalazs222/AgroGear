import { useState } from "react";

function Home() {
    const [products, setProducts] = useState([])

    return (
        <>
            <h1>Kezdőlap</h1>
            {products.map(products => (
                <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>

                            </Card.Text>
                            <Button variant="primary">Kosárba</Button>
                        </Card.Body>
                    </Card>
                </>
            ))}
        </>
    )
}

export default Home;