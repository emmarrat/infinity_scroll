import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import React from "react";

interface Props {
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
}

const ProductCard:React.FC<Props> = ({title, category, description, price, image}) => {
    return (
        <Card sx={{ maxWidth: 345, mb: 2 }}>
            <CardHeader
                title={title}
                subheader={category}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {price} $ USD
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;