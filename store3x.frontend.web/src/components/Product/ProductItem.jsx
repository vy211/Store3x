import React from 'react'
import '../../styles/product.css';



const MenuCard = ({ itemNum, burgerSrc, price, title, handler }) => {
    return <div className="menuCard">

        <div>Item{itemNum}</div>
        <main>
            <img src={burgerSrc} alt={itemNum} />
            <h5>₹{price}</h5>
            <p>{title}</p>
            <button>add to cart</button>
            <button onClick={() => handler(itemNum)} >Buy Now</button>
        </main>

    </div>

}

export default MenuCard
