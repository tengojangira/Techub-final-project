import React, { useState, useEffect } from "react";
import data from "../data/products.json";

export default function CartElement(props) {
    const [count, setCount] = useState(1);

    useEffect(() => {
        props.parentCallBack();
    });

    // -
    function decrease() {
        if (count === 1) {
            setCount(count);
            return;
        }
        setCount(count - 1);
        props.parentCallBack();
    }
    // +
    function increase() {
        setCount(count + 1);
        props.parentCallBack();
    }
    // 
    function deleteItemFromCart() {
        props.remove(props.item);
    }

    return (
        <>
            <div id="eachItem">
                <img src={data[Number(props.item[0]) - 1].url} alt="alt" />
                <div className="aboutItem">
                    <p>{data[Number(props.item[0]) - 1].title}</p>
                    <p>Price: <span>{data[Number(props.item[0]) - 1].price} GEL</span></p>
                    <p>Size : <span>{props.item.split(",")[1]}</span></p>
                    <p>Total: <span id={props.item}>{data[Number(props.item[0]) - 1].price * count}</span> <span>GEL</span></p>
                </div>
                <div className="itemButtons">
                    <button onClick={deleteItemFromCart} className="remove">Remove</button><br></br>
                    <div className="add">
                        <button onClick={decrease}>-</button>
                        <p id={props.item + "quantity"}>{count}</p>
                        <button onClick={increase}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}