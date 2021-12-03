import React, { useEffect, useState } from "react";
import { alphabetical } from "../models/numberToStringMap";
import { useAppDispatch } from "../store/hooks";
import { saveNumbers } from "../store/PhoneSlice";
import PhoneKey from "./Phonekey";
import "./PhoneKeypad.css"




function PhoneKeypad() {
    const [numbers, setNumbers] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const list = Object.keys(alphabetical);
        setNumbers(list)
    }, [])

    const handleClick = (number: string) => {
        dispatch(saveNumbers(number))
    }

    return (
        <div className="phone-keypad">
            {numbers.map((num, index) => <PhoneKey key={index + Math.random() * 10} {...{ number: num, letters: alphabetical[num], handleClick }} />)}
        </div>
    )
}


export default PhoneKeypad;