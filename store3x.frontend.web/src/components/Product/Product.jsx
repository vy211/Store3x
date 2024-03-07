import React from 'react'
import MenuCard from './ProductItem'
import burger1 from "../../assets/product/product-1.jpg"
import burger2 from "../../assets/product/product-2.jpg"
import burger3 from "../../assets/product/product-3.jpg"
import burger4 from "../../assets/product/product-4.jpg"
import burger5 from "../../assets/product/product-5.jpg"
import burger6 from "../../assets/product/product-6.jpg"
import burger7 from "../../assets/product/product-7.jpg"
import burger8 from "../../assets/product/product-8.jpg"
import burger9 from "../../assets/product/product-9.jpg"
import burger10 from "../../assets/product/product-10.jpg"
import burger11 from "../../assets/product/product-11.jpg"
import burger12 from "../../assets/product/product-12.jpg"
import burger13 from "../../assets/product/product-13.jpg"
import burger14 from "../../assets/product/product-14.jpg"




const productData = [
    { itemNum: 1, burgerSrc: burger1, price: 200, title: "Cheese Burger", delay: 0.1 },
    { itemNum: 2, burgerSrc: burger2, price: 200, title: "Veg Cheese Burger", delay: 0.5 },
    // ... (add other product data)
];



const Menu = () => {
    const addToCartHandler = (itemNum) => {
        // Implement logic for adding to cart
        console.log(`Item ${itemNum} added to cart`);
    };
    const buyNowHandler = (itemNum) => {
        // Implement logic for buying now
        console.log(`Buying item ${itemNum} now`);
    };

    return (
        <section id="menu">
            <h1>Product</h1>
            <div>
                {productData.map((product) => (
                    <MenuCard
                        key={product.itemNum}
                        addToCartHandler={addToCartHandler}
                        buyNowHandler={buyNowHandler}
                        {...product}
                    />
                ))}
            </div>
        </section>
    );
};

export default Menu;






