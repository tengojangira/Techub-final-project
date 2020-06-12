import React, { useState} from "react";
import './Items.css';


export default function Items(props) {
    const [count, setCount] = useState(0);
    function freeOrNot(item) {
        if (item.isFreeShipping === true) {
            return <p id="free">Free Shipping</p>;
        }
        return;
    }
    
    return (
        <div>

            <div className="items">
                <a href={props.item.id} >
                    <img src={props.item.url} alt="alt" />
                    {freeOrNot(props.item)}
                    <p>
                        {props.item.title}
                        <span>{props.item.price} GEL</span>
                    </p>
                    <button onClick={() => setCount(count + 1)}><span>+</span> Add to cart</button>
                </a>
            </div>
            <p id="ion">{count}</p>

        </div>
    )
}