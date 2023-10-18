import React, {useEffect, useState} from "react";
import {Product, ProductsResponse} from "../../types";
import {CircularProgress, Grid} from "@mui/material";
import useIntersectionObserver from "../../hooks/useIntersectionObserver.ts";
import axiosApi from "../../axiosApi.ts";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";

const Products = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchProducts = async (skip = 0, limit = 10) => {
        setLoading(true);
        try {
            const resp = await axiosApi.get(`/products?limit=${limit}&skip=${skip}`);
            const data = resp.data as ProductsResponse;

            if (data.total < skip + limit) setHasNextPage(false);
            setLoading(false);
            return data.products;
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            return [];
        }
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
        <>
            <Grid
                item
                container
                alignItems="center"
                flexWrap="wrap"
                spacing={2}
                xs={12} md={9}
            >
                {products.map((product, i, products) => (
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        sm={6}
                        md={4}
                        key={product.id}
                        ref={products.length - 1 === i ? lastProductRef : undefined}
                    >
                        <ProductCard product={product}/>
                    </Grid>

                ))}
                <Grid item sx={{width: '100%'}} mt={2}>
                    {loading && <CircularProgress/>}
                </Grid>
            </Grid>
        </>
    );
};

export default Products;