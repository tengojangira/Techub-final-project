import React, { useState, useEffect } from 'react';
import CartElement from "./CartElement";
import './Cart.css';

export default function Cart() {
    const [total, setTotal] = useState(0);
    const [addedItem, setAddedItem] = useState(window.sessionStorage.getItem('cartItems'));

    function empty() {
        if (!addedItem) return <h1 id="empty">Cart is empty</h1>;
    }

    function calculateTotalItemsCost() {
         if (!addedItem) {
            setTotal(0);
            return;
        }
        let sum = 0;
        let eachItemOfAddedItem = addedItem.split(' ');
        for (let i = 0; i < eachItemOfAddedItem.length; i++) {
            sum += Number(document.getElementById(`${eachItemOfAddedItem[i]}`).innerHTML);
        }
        setTotal(sum);
    }

    useEffect(() => {
        calculateTotalItemsCost();
    });

    function deleteItemFromCart(item) {
        if (!addedItem) return [];
        if (item) {
            let eachItemOfAddedItem = addedItem.split(' ');
            for (let i = 0; i < eachItemOfAddedItem.length; i++) {
                if (eachItemOfAddedItem[i] === item) {
                    eachItemOfAddedItem.splice(i, 1);
                    setAddedItem([...eachItemOfAddedItem].join(' '));
                    window.sessionStorage.setItem('cartItems', eachItemOfAddedItem.join(' '));
                }
            }
            // console.log(addedItem.length);
            return addedItem;
        } else return addedItem.split(' ');
    }


    return (
        <React.Fragment>
            <h1 id="title">Cart</h1>
            <div id="cartItem">
                {empty()}
                {deleteItemFromCart().map(i => <CartElement item={i} key={i}
                    remove={(item) => { deleteItemFromCart(item) }} parentCallBack={() => { calculateTotalItemsCost() }} />)}

            </div>
            <br></br>
            <div className="totalCost">
                <hr></hr>
                <h2 id="total">Total: <span>{total} GEL</span></h2>
                <hr></hr>
            </div>

        </React.Fragment>
    )

}
