import Button from "./Button";
import React,  {useState} from "react";
import { useEffect } from "react";

export default function SizeButton(){
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const saved = localStorage.getItem('font-scale');
        if (saved) setScale(parseFloat(saved));
    }, []);

    useEffect(() => {
        document.documentElement.style.fontSize = `${scale * 16}px`;
        localStorage.setItem('font-scale', scale);
    }, [scale]);

    return(
        <div>
            <Button 
                text="A-"
                onClick={() => setScale(s => Math.max(0.875, s - 0.125))}
                variant="secondary"
            />
            <Button 
                text="A+"
                onClick={() => setScale(s => Math.min(1.5, s + 0.125))}
                variant="secondary"
            />
        </div>
    )
}