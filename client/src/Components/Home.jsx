import '../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import MainForm from './MainForm'
import Result from './Result'

const Home = () => {
    const [backendConnected, setBackendConnected] = useState(false)
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const [result, setResult] = useState({})

    const errorMessage = 'Cannot connect to the backend server. Please try again later.'

    useEffect(() => {
        axios.get('http://localhost:8000/').then((response) => {
            if (response.status === 200) {
                setWelcomeMessage(response.data.data)
                setBackendConnected(true)
            } 
            else {
                setWelcomeMessage(errorMessage)
            }
        }).catch(() => setWelcomeMessage(errorMessage))
    }, [])

    const predict = (e, gender, bsc, workex, etest, msc) => {
        e.preventDefault()
        let params = { gender, bsc, workex, etest, msc }
        gender === 'Male' ? params.gender = '1' : params.gender = '0'
        workex === 'Yes' ? params.workex = '1' : params.workex = '0'

        axios.post('http://localhost:8000/prediction', params).then((response) => {
            setResult(response.data.data)
        }).catch((error) => alert(`Error: ${error.message}`))
    }

    const tryAgain = () => {
        setResult({})
    }

    return (
        <>
            { Object.keys(result).length === 0 ? <MainForm backendConnected={backendConnected} welcomeMessage={welcomeMessage} predict={predict} /> : <Result result={result} tryAgain={tryAgain}/> }                   
        </>
    )
}

export default Home