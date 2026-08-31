import "../../index.css"
import Button from "./Button"

export default function ContrastButton() {
    function toggleBg() {
        const current = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-runtime').trim() || '#ffffff';

        if (current !== '#000') {
            document.documentElement.style.setProperty('--bg-runtime', '#000');
            document.documentElement.style.setProperty('--color-negro-txt', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--bg-runtime', '#ffffff');
            document.documentElement.style.setProperty('--color-negro-txt', '#000');
        }
    }

    return (
        <Button
            text="🌓"
            onClick={toggleBg}
            variant="secondary"
        />
    );
}