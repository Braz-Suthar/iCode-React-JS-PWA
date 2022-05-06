import React, { Component } from 'react';
import errorImage from '../images/error.png'

export default class Alert extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            showModal: this.props.showModal,
            alertData: this.props.alertData
        }
    }

    styles = {
        modalContainer: {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            position: 'fixed',
            top: 0,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
        },
        modal: {
            width: '60vw',
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '0.7rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
        },
        modalButton: {
            border: 'none',
            outline: 'none',
            padding: '0.4rem 0rem',
            borderTop: '0.05rem solid #e0e0e0',
            color: '#007aff',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        modalHeading: {
            margin: '0.8rem 0rem 0.5rem 0rem',
            color: '#333333'
        },
        modalSubHeading: {
            margin: '0.5rem 1rem 1rem 1rem',
            fontSize: '0.8rem',
            color: '#bdbdbd'
        },
    }
    
    render(){
        return(
                this.state.showModal && 
                <div style={this.styles.modalContainer}>
                    <div style={this.styles.modal}>
                        <h3 style={this.styles.modalHeading}>{ this.state.alertData.title }</h3>
                        <img src={errorImage} style={{ width: '60%', margin: 'auto' }}/>
                        <p style={this.styles.modalSubHeading}>{ this.state.alertData.message }</p>
                        <button  onClick={() => { 
                            this.setState({ showModal: false })
                            this.props.onClickFunction()
                        }} style={{...this.styles.modalButton, borderBottomLeftRadius: '0.7rem', borderBottomRightRadius: '0.7rem'}}>Close</button>
                    </div>
                </div>
        )
    }
}