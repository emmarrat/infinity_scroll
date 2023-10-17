import React, {useEffect, useState} from "react";
import {Product, ProductsResponse} from "../types";
import {CircularProgress} from "@mui/material";
import useIntersectionObserver from "../hooks/useIntersectionObserver.ts";
import ProductCard from "./ProductCard/ProductCard.tsx";

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
                    <ProductCard
                        title={product.title}
                        description={product.description}
                        category={product.category}
                        price={product.price}
                        image={product.images[0]}
                    />
                </div>

            ))}
            {loading && <CircularProgress/>}
        </div>
    );
};

export default FetchExample;