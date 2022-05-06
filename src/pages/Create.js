import React, { Component, useCallback } from 'react';
import { 
    BsCheckCircle,
    BsXCircle, 
} from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import { Add } from '../LocalStorage'

export default class Create extends Component {
    
    state = {
        redirect: false,
        qrCodeCreated: false,
        error: false,
        qrCodeUrl: '',
        formData: {
            title: '',
            creator: '',
            data: ''
        }
    }

    handleSubmit = () => {
        if(this.state.qrCodeCreated){
            Add({ title: this.state.formData.title, url: this.state.qrCodeUrl })
            this.setState({redirect: true});
        }else{
            this.submitForm()
        }
    }

    submitForm = () => {
        if(this.state.formData.title == '' || this.state.formData.creator == '' || this.state.formData.data == ''){
            this.setState({
                error: true
            })
        }else{
            const codeData = JSON.stringify(this.state.formData)
            console.log(codeData)
            this.setState({
                qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${ encodeURI(codeData) }`,
                qrCodeCreated: true
            })

        }
    }   

    styles = {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '1rem 1rem',
            color: '#2c2c2e',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white'
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            color: '#007aff'
        },
        middleContainer: {
            padding: '0.7rem 1rem'
        },
        heading: {
            marginTop: '1rem',
            color: '#48484a',
            marginBottom: '1.5rem'
        },
        inputBox: {
            marginTop: '1.5rem'
        },
        inputHeading: {
            color: '#636366'
        },
        input: {
            width: '100%',
            borderRadius: '0.3rem',
            padding: '0.5rem',
            border: '0.05rem solid #bdbdbd',
        },
        btnPreview: {
            width: '100%',
            marginTop: '2rem', 
            backgroundColor: '#007aff',
            fontSize: '1.1rem',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem',
        },
        previewContainer: {
            textAlign: 'center',
            padding: '1.5rem 0rem 1rem 0rem'
        },
    }

    render() {

        if (this.state.redirect) {
            return <Navigate to="/" />
        }

        return (
            <div style={this.styles.mainContainer}>
                <div style={this.styles.header}>
                    <div>
                        <Link to="/" replace style={{ textDecoration: 'none' }}>
                            <div style={this.styles.button}>
                                <BsXCircle style={{ marginRight: '0.4rem' }}/>
                                Cancel
                            </div>
                        </Link>
                    </div>
                    <div>
                        {/* <Link to={ location => { console.log(location) } } replace style={{ textDecoration: 'none' }}> */}
                            <div style={this.styles.button} onClick={this.handleSubmit}>
                                <BsCheckCircle style={{ marginRight: '0.4rem' }}/>
                                Done 
                            </div>
                        {/* </Link> */}
                    </div>
                </div>

                <div style={this.styles.middleContainer}>
                    <div style={this.styles.heading}>
                        <h1>Create QR Code</h1>
                    </div>
                    <div style={this.styles.inputBox}>
                        <h5 style={this.styles.inputHeading}>Title</h5>
                        <input type="text" onChange={event => { this.setState({ error: false, formData: { ...this.state.formData, title: event.target.value } }) }} value={this.state.formData.title} style={this.styles.input} placeholder="e.g. My First QR Code"/>
                    </div>
                    <div style={this.styles.inputBox}>
                        <h5 style={this.styles.inputHeading}>Creator</h5>
                        <input type="text" onChange={event => { this.setState({ error: false, formData: { ...this.state.formData, creator: event.target.value } }) }} value={this.state.formData.creator} style={this.styles.input} placeholder="e.g. Braz Suthar"/>
                    </div>
                    <div style={this.styles.inputBox}>
                        <h5 style={this.styles.inputHeading}>Data</h5>
                        <textarea onChange={event => { this.setState({ error: false, formData: { ...this.state.formData, data: event.target.value } }) }} style={this.styles.input} rows="5" placeholder="e.g. Hi, This is my first ever QR Code.">
                            { this.state.formData.data }
                        </textarea>
                    </div>
                    <p style={{ color: '#ff2d55' }}>{ this.state.error ? 'Please fill all fields.' : '' }</p>
                    <button style={this.styles.btnPreview} onClick={this.submitForm} >Preview</button>
                    <div style={this.styles.previewContainer}>
                        { this.state.qrCodeCreated && <img src={ this.state.qrCodeUrl } />}
                    </div>
                </div>

            </div>
        )
    }
}