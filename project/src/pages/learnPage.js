import { useNavigate } from "react-router-dom";

function LearnPage() {
    const navigate = useNavigate()
    const handleClick = () => { navigate("/") }

    return (
        <>
            <button onClick={handleClick}>Click me!</button>
        </>
    );
}

export default LearnPage;