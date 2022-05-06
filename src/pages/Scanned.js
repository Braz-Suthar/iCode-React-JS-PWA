import React, { Component, useState } from 'react';
import { 
    BsCheckCircle,
    BsXCircle, 
} from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

export default function Scanned(props) {
    
    const scannedQRCodeData_ = useParams()
    const [ scannedQRCodeData, setScannedQRCodeData ] = useState(JSON.parse(JSON.parse(JSON.stringify(scannedQRCodeData_)).data))

    return (
        <div style={styles.mainContainer}>
            <div style={styles.header}>
                <div>
                    <Link to="/" replace style={{ textDecoration: 'none' }}>
                        <div style={styles.button}>
                            <BsXCircle style={{ marginRight: '0.4rem' }}/>
                            Close
                        </div>
                    </Link>
                </div>
            </div>

            <div style={styles.middleContainer}>
                <div style={styles.heading}>
                    <h1>Scanned QR Code Data</h1>
                </div>
                <div style={styles.inputBox}>
                    <h5 style={styles.inputHeading}>Title</h5>
                    <p>{ scannedQRCodeData.title ? scannedQRCodeData.title : '-' }</p>
                </div>
                <div style={styles.inputBox}>
                    <h5 style={styles.inputHeading}>Creator</h5>
                    <p>{ scannedQRCodeData.creator ? scannedQRCodeData.creator : '-'}</p>
                </div>
                <div style={styles.inputBox}>
                    <h5 style={styles.inputHeading}>Data</h5>
                    <p>{ scannedQRCodeData.data ? scannedQRCodeData.data : '-'}</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100vh',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem 1rem',
        color: '#2c2c2e',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'sticky',
        top: 0
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
}