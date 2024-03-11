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




const Menu = () => {
    const addToCartHandler = (itemNum) => {

    };


    return (
        <section id="menu">
            <h1>Product</h1>
            <div>

                <MenuCard
                    itemNum={1}
                    burgerSrc={burger1}
                    price={200}
                    title="Cheese Burger"
                    delay={0.1}
                    handler={addToCartHandler}
                />
                <MenuCard
                    itemNum={2}
                    burgerSrc={burger2}
                    price={200}
                    title="Veg Cheese Burger"
                    delay={0.5}
                    handler={addToCartHandler}
                />
                <MenuCard
                    itemNum={3}
                    burgerSrc={burger3}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={4}
                    burgerSrc={burger4}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={5}
                    burgerSrc={burger5}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={5}
                    burgerSrc={burger5}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={6}
                    burgerSrc={burger6}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={7}
                    burgerSrc={burger7}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={8}
                    burgerSrc={burger8}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={9}
                    burgerSrc={burger9}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={10}
                    burgerSrc={burger10}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={11}
                    burgerSrc={burger11}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={12}
                    burgerSrc={burger12}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={13}
                    burgerSrc={burger13}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

                <MenuCard
                    itemNum={14}
                    burgerSrc={burger14}
                    price={450}
                    title="Cheese Burger with French Fry"
                    delay={0.8}
                    handler={addToCartHandler}
                />

            </div>
        </section>
    )
}




export default Menu
