import '../App.css'
import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'

const Result = props => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        props.result.prediction === 1 ? setMessage('Congrats! ' + props.result.message) : setMessage('Sorry! ' + props.result.message)
    }, [props.result])

    return (
        <div className='glass'>
            <h2 className="mb-5">{message}</h2>
            <div className='glassFormGroup'>
                <Button type="button" className="glassFormBtn" onClick={() => props.tryAgain()}>
                    Try Again
                </Button>
            </div>
        </div>
    )
}

export default Result