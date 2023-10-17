import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Product} from "../../types";

interface Props {
    product: Product
}

const ProductCard: React.FC<Props> = ({product}) => {
    return (
        <Card sx={{width: '240px', height: '320px'}}>
                <CardMedia
                    width="220"
                    component="img"
                    height="200px"
                    image={product.thumbnail}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" sx={{overflow: 'scroll'}}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.price} USD $
                    </Typography>
                </CardContent>
        </Card>
    );
};

export default ProductCard;