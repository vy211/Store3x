import React from 'react';
import '../../styles/product.css';

const MenuCard = ({ itemNum, burgerSrc, price, title, addToCartHandler, buyNowHandler }) => {
    return (
        <div className="menuCard">
            
            <main>
                <img src={burgerSrc} alt={itemNum} />
                <h5>₹ {price}</h5>
                <p>{title}</p>
                <div className="button-container">
                    <button onClick={() => addToCartHandler(itemNum)}>Add to Cart</button>
                    <button onClick={() => buyNowHandler(itemNum)}>Buy Now</button>
                </div>
            </main>
        </div>
    );
}

export default MenuCard;
