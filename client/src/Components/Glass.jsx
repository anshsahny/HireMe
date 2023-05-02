import './Glass.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Glass = props => {
    const [welcomeMessage, setWelcomeMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/').then((response) => {
            setWelcomeMessage(response.data.data)
        }).catch((error) => alert(`Error: ${error.message}`))
    }, [])

    return (
        <div className='glass'>
            <h2 className="mb-5">{welcomeMessage}</h2>
            <form className='glassForm'>
                <h4>Employment Data</h4>
            </form>
        </div>
    )
}

export default Glass