import React, {useEffect, useState} from "react";
import {Product, ProductsResponse} from "../types";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import useIntersectionObserver from "../hooks/useIntersectionObserver.ts";

const FetchExample = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchProducts = async (skip = 0, limit = 10) => {
        setLoading(true);
        const resp = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await resp.json() as ProductsResponse;
        if (data.total < skip + limit) setHasNextPage(false)
        setLoading(false);
        return data.products
    };

    useEffect(() => {
        void fetchProducts().then(setProducts)
    }, []);

    const lastProductRef = useIntersectionObserver<HTMLDivElement>(
        (node) => {
            if (node) {
                void fetchProducts(products.length).then((newProducts) =>
                    setProducts((prevProducts) => [...prevProducts, ...newProducts])
                );
            }
        },
        [hasNextPage, !loading]
    );
    return (
        <div>
            {products.map((product, i, products) => (
                <div
                    key={product.id}
                    ref={products.length - 1 === i ? lastProductRef : undefined}
                >
                    <Card
                        sx={{minWidth: 275, mb: 1}}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.title}
                            </Typography>

                            <Typography variant="body2">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

            ))}
            {loading && <CircularProgress/>}
        </div>
    );
};

export default FetchExample;