import './App.css'
import {Grid} from "@mui/material";
import Products from "./pages/Products/Products.tsx";

function App() {

    return (
        <Grid container justifyContent="center">
           <Products/>
        </Grid>
    )
}

export default App
