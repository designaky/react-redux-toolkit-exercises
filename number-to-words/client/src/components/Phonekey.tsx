import React from "react";




function PhoneKey({ number, letters, handleClick }: { number: string, letters: string[], handleClick: (arg: string) => void }) {


    return (
        <button className={`phone-keypad__btn btn__${number}`} onClick={() => handleClick(number)}>
            <p>
                {number}
            </p>
            {letters.map((letter, index) => <span key={index + letter}>{letter.toLocaleUpperCase()}</span>)}
        </button>
    )
}


export default PhoneKey;