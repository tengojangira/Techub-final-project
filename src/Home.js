import React, {  useState } from 'react';
import data from "./data/products.json";
import Items from './Components/Items';
import './Home.css';


export default function Home() {
    const [Data, setData] = useState(data);

    function handleChange() {
        if (document.getElementById('order').value === 'up') {
            setData([...Data].sort((a, b) => a.price - b.price));
        }
        if (document.getElementById('order').value === 'down') {
            setData([...Data].sort((a, b) => b.price - a.price));
        }
    }

    function handleClick() {
        document.getElementById('order').value = 'defOrder';
        let mainArray = ["XS", "S", "M", "L", "XL", "XXL"];
        let sizeArray = [];         // sizes which is checked
        let indexArray = [];        // indexes where are same sizes in data

        for (let i = 1; i <= 6; i++) {
            if (document.getElementById('check_' + i).checked) {
                sizeArray.push(mainArray[i - 1]);
            }
        }

        for (let j = 0; j < data.length; j++) {
            if (includesOrNot(sizeArray, data[j].availableSizes)) {
                indexArray.push(j);
            }
        }

        let result = [];
        let dt = [...data];
        for (let k = 0; k < indexArray.length; k++) {
            result.push(dt.slice(indexArray[k], indexArray[k] + 1));
        }

        setData(result.flat());
    }

    function includesOrNot(arr, dt) {
        return arr.every(i => dt.includes(i));
    }

    return (
        <div>
            <div className="control">
                <div className="sizes">
                    <p id="sizeNames">Sizes:</p>
                    <form id="sizeForm">
                        <ul>
                            <li>
                                <input type="checkbox" id="check_1" name="xsSize" value="xsSize" onClick={handleClick} />
                                <label htmlFor="check_1">XS</label>
                            </li>
                            <li>
                                <input type="checkbox" id="check_2" name="sSize" value="sSize" onClick={handleClick} />
                                <label htmlFor="check_2">S</label>
                            </li>
                            <li>
                                <input type="checkbox" id="check_3" name="mSize" value="mSize" onClick={handleClick} />
                                <label htmlFor="check_3">M</label>
                            </li>
                            <li>
                                <input type="checkbox" id="check_4" name="lSize" value="lSize" onClick={handleClick} />
                                <label htmlFor="check_4">L</label>
                            </li>
                            <li>
                                <input type="checkbox" id="check_5" name="xlSize" value="xlSize" onClick={handleClick} />
                                <label htmlFor="check_5">XL</label>
                            </li>
                            <li>
                                <input type="checkbox" id="check_6" name="xxlSize" value="xxlSize" onClick={handleClick} />
                                <label htmlFor="check_6">XXL</label>
                            </li>
                        </ul>
                    </form>
                </div>
                <p id="quantity"><span>{Data.length}</span> Product found</p>
                <form id="sort">
                    <select name="order" id="order" onChange={handleChange} defaultValue="defOrder">
                        <option value="defOrder">Order by</option>
                        <option value="up">Lowest To Highest</option>
                        <option value="down">Highest To Lowest</option>
                    </select>
                </form>
            </div>
            <div id="render">
                {Data.map((item) => {
                    return <Items key={item.id} item={item}/>
                })}
            </div>
        </div>
    );
}

