import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { currentSuggestions, currentScreenValues, getSuggestions, saveWord, currentKeypadValues, currentSaveValue } from "../store/PhoneSlice";
import "./PhoneKeypad.css"




function PhoneScreen() {
    const suggestions = useAppSelector(currentSuggestions)
    const screenValue = useAppSelector(currentScreenValues)
    const addNumbers = useAppSelector(currentSaveValue)
    const screenNumberValues = useAppSelector(currentKeypadValues)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (addNumbers) dispatch(saveWord(screenNumberValues.join("")))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addNumbers])

    useEffect(() => {
        dispatch(getSuggestions(screenNumberValues.join("")))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenNumberValues])

    const saveSuggestion = (word: string) => {
        dispatch(saveWord(word))
    }


    const formatForScreen = (elements: string[]): JSX.Element[] => {
        return elements.map((ele, index) => {
            if (/\s/g.test(ele) && !ele.trim()) return <span key={index}>&nbsp;</span>
            return <span key={index}>{ele}</span>
        })
    }

    return (
        <div className="phone-screen">
            <p className="phone-screen__output">
                {formatForScreen(screenValue.split(""))}
                {formatForScreen(screenNumberValues)}
                <span className="phone-screen__output-pointer">|</span>
            </p>
            <p className="phone-screen__suggestion-list">
                {suggestions.map((suggestion, index) => <span key={index + Math.random() * 10} className="phone-screen__suggestion-item" onClick={() => saveSuggestion(suggestion)}>{suggestion}</span>)}
            </p>
        </div>
    )
}


export default PhoneScreen;