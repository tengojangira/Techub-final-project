import React, { useState , Fragment} from "react";
import { useParams } from "react-router-dom";
import data from "../data/products.json";
import './Item.css';


export default function Item() {
    const [count, setCount] = useState(0);
    let { itemId } = useParams();
    let index = itemId - 1;
    
    // loop sizes
    function sizes() {
        return data[index].availableSizes
            .map(size =>
                <Fragment key={"box of" + size} >
                    <input type="checkbox" id={size} key={'input-' + size }></input>
                    <label htmlFor={size} key={'label-' + size} >{size} </label>
                </Fragment> 
            );
    }

    function addItem() {
        
        for (let i = 0; i < data[index].availableSizes.length; i++) {
            if (document.getElementById(data[index].availableSizes[i]).checked) {
                
                let size = data[index].availableSizes[i];
                let selectedCartItems = window.sessionStorage.getItem('cartItems');
                let arrayOfSelectedCartItems = [];

                if (selectedCartItems) {
                    arrayOfSelectedCartItems.push(selectedCartItems.split(' '));
                    arrayOfSelectedCartItems = arrayOfSelectedCartItems.flat();
                    let element = (data[index].id + ',' + size).toString();
                    if (!arrayOfSelectedCartItems.includes(element)) {
                        selectedCartItems += ' ' + element;
                        arrayOfSelectedCartItems.push(element);
                        setCount(count + 1);
                    } else {
                        alert("You have already added item into cart !");
                    }
                    // console.log(arrayOfSelectedCartItems);
                } else {
                    selectedCartItems = data[index].id + ',' + size;
                    arrayOfSelectedCartItems.push((data[index].id + ',' + size).toString());
                    // console.log(arrayOfSelectedCartItems);
                    setCount(count + 1);
                }
                window.sessionStorage.setItem('cartItems', selectedCartItems);
                break;
            }
        }
    }
    function freeOrNot(item) {
        if (item.isFreeShipping === true) {
            return <p id="freeInEachItem">Free Shipping</p>;
        }
        return;
    }

    return (

        <div id="item" >
            <img src={data[index].url}  alt="img"/>
            {freeOrNot(data[index])}
            <div className="content">
                <div>
                    <p className="item-title">{data[index].title}</p>
                    <p className="description">{data[index].description}</p>
                    <p className="price">Price: <span>{data[index].price} GEL</span></p>
                    <p className="size">Size: {sizes()}</p>
                </div>
                <div>
                    <button onClick={addItem}><span>+</span> Add to cart</button>
                </div>
            </div>
            <p id="ion">{count}</p>
        </div>

    )
}