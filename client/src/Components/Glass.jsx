import './Glass.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Glass = props => {
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const [gender, setGender] = useState('')
    const [bsc, setBsc] = useState('')
    const [workex, setWorkex] = useState('')
    const [etest, setEtest] = useState('')
    const [msc, setMsc] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/').then((response) => {
            setWelcomeMessage(response.data.data)
        }).catch((error) => alert(`Error: ${error.message}`))
    }, [])

    const predict = (e) => {
        e.preventDefault()
        let params = { gender, bsc, workex, etest, msc }
        gender === 'Male' ? params.gender = '1' : params.gender = '0'
        workex === 'Yes' ? params.workex = '1' : params.workex = '0'

        axios.post('http://localhost:8000/prediction', params).then((response) => {
            let data = response.data.data
            let msg = `Prediction: ${data.prediction}\nMessage: ${data.message}`
            alert(msg)
        }).catch((error) => alert(`Error: ${error.message}`))
    }

    return (
        <div className='glass'>
            <h2 className="mb-5">{welcomeMessage}</h2>
            <Form onSubmit={(e) => predict(e)} className='glassForm'>
                <h4>Employment Data</h4>
                <div className='glassFormGroup'>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        id="gender"
                        className='glassFormComponent'
                        required
                        autoFocus
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Applicant's Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </div>
                <div className='glassFormGroup'>
                    <Form.Label>BSc CGPA (1.00 - 5.00)</Form.Label>
                    <Form.Control
                        id="bsc"
                        className='glassFormComponent'
                        placeholder="BSc CGPA (1.00 - 5.00)"
                        required
                        min={0}
                        max={5}
                        type='number'
                        pattern="[0-9]+([\.,][0-9]+)?"
                        step="0.01"
                        value={bsc}
                        onChange={(e) => setBsc(e.target.value)}
                    />
                </div>
                <div className='glassFormGroup'>
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Select
                        id="workex"
                        className='glassFormComponent'
                        required
                        autoFocus
                        value={workex}
                        onChange={(e) => setWorkex(e.target.value)}
                    >
                        <option value="">Does Applicant have Work Experience?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Select>
                </div>
                <div className='glassFormGroup'>
                    <Form.Label>E-Test Score (1.00 - 100.00)</Form.Label>
                    <Form.Control
                        id="etest_p"
                        className='glassFormComponent'
                        placeholder="E-Test Score (1.00 - 100.00)"
                        required
                        min={0}
                        max={100}
                        type='number'
                        pattern="[0-9]+([\.,][0-9]+)?"
                        step="0.01"
                        value={etest}
                        onChange={(e) => setEtest(e.target.value)}
                    />
                </div>
                <div className='glassFormGroup'>
                    <Form.Label>MSc CGPA (1.00 - 5.00)</Form.Label>
                    <Form.Control
                        id="msc"
                        className='glassFormComponent'
                        placeholder="MSc CGPA (1.00 - 5.00)"
                        required
                        min={0}
                        max={5}
                        type='number'
                        pattern="[0-9]+([\.,][0-9]+)?"
                        step="0.01"
                        value={msc}
                        onChange={(e) => setMsc(e.target.value)}
                    />
                </div>
                <div className='glassFormGroup'>
                    <Button
                        type="submit"
                        className="glassFormBtn"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Glass