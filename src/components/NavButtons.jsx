import { useNavigate } from "react-router-dom"

export default function NavButtons(props) {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}