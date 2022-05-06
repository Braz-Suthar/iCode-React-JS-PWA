import React, { Component, createRef } from 'react';
import { 
    MdQrCodeScanner,
    MdOutlineAddBox, 
} from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import MyQRCodeList from "../components/MyQRCodeList"
import Alert from '../components/Alert';
import Logo from '../images/logo.png'


export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.imgRef = createRef()
        this.barcodeDetector = ''
        this.fileInput = createRef()
    }

    state = {
        showModal: false, 
        redirect: false,
        imgUri: '',
        alertError: false,
        alertData: {},
        redirectToScannedScreen: false,
        scannedQRCodeData: '',
        showSplashScreen: true
    }

    styles = {
        splashScreen: {
            width: '100vw',
            height: '90vh',
            zIndex: 999999999,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden'
        },
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0.7rem 1rem',
            color: '#2c2c2e',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white'
        },
        headerIcon: {
            fontSize: '1.5rem',
            color: '#007aff'
        },
        middleContainer: {
             padding: '0.7rem 1rem'
        },
        heading: {
            marginTop: '1.2rem',
            color: '#48484a'
        },
        qrCodeListContainer: {
            marginTop: '1.2rem',
            overflowY: 'scroll',
            paddingBottom: '2.5rem'
        },
        footer: {
            backgroundColor: '#f2f2f7',
            textAlign: 'center',
            paddingTop: '0.8rem',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            color: '#8e8e93'
        },
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

    componentDidMount(){
        if('BarcodeDetector' in window){
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                this.barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
            }
        }else{
            console.log('no')
        }

        setTimeout(() => {
            this.setState({ 
                showSplashScreen: false
            })
        }, 3000)
    }

    waiting = () => { 
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 500)
        })
    }

    handleChoosePhoto = async () => { 
        this.setState({ 
            imgUri: URL.createObjectURL(this.fileInput.current.files[0])
        })

        await this.waiting()

        this.barcodeDetector.detect(this.imgRef.current).then(codes => {
            // If no codes exit function
            if (codes.length === 0){
                this.setState({
                    alertError: true,
                    alertData: {
                        title: 'Error',
                        message: 'No QR Code Found in this image.'
                    }
                })
                return;
            } 
            
            for (const barcode of codes)  {
              // Log the barcode to the console
              let scannedQRCodeData = barcode.rawValue
            //   alert('2')
              if(scannedQRCodeData.toString().includes('{')){
                  scannedQRCodeData = JSON.parse(barcode.rawValue)
              }
              this.setState({
                  scannedQRCodeData: {
                      title: typeof scannedQRCodeData === 'object' ? (scannedQRCodeData.title ? scannedQRCodeData.title : '') : '',
                      creator: typeof scannedQRCodeData === 'object' ? (scannedQRCodeData.creator ? scannedQRCodeData.creator : '') : '',
                      data: typeof scannedQRCodeData === 'object' ? (scannedQRCodeData.data ? scannedQRCodeData.data : '') : scannedQRCodeData.toString()
                  },
                  redirectToScannedScreen: true
              })
            }
          }).catch(err => {
            // Log an error if one happens
            this.setState({
                alertError: true,
                alertData: {
                    title: 'Error',
                    message: "Couldn't scan QR Code."
                }
            })
          })

          this.setState({
              showModal: false
           })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/scan" />
        }

        if(this.state.redirectToScannedScreen){
            const navigationLink = `/scanned/${ JSON.stringify(this.state.scannedQRCodeData) }`
            return <Navigate to={navigationLink} />
        }

        if(this.state.showSplashScreen){
            return (
                <div style={this.styles.splashScreen}>
                    <div style={{ textAlign: 'right', padding: '1rem', color: '#8e8e93'}}>
                        v1.0 | 2205
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5rem' }}>
                        <img src={Logo} width="40%" />
                    </div>
                    <div style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', padding: '1rem', color: '#45484a'}}>
                        <h3>Braz Suthar</h3>
                    </div>
                </div>
            )
        }

        return (
            <div style={this.styles.mainContainer}>
                { 
                   this.state.alertError && <Alert showModal={true} alertData={this.state.alertData}/>
                }
                <div style={this.styles.header}>
                    <div>
                        <Link to="/create">
                            <MdOutlineAddBox style={this.styles.headerIcon}/>
                        </Link>
                    </div>
                    <div>
                        <h3 style={{ padding: '0', margin: '0', fontWeight: 'bold' }}>iCode</h3>
                    </div>
                    <div>
                        {/* <Link to="/scan"> */}
                            <MdQrCodeScanner onClick={() => { this.setState({ showModal: true }) }} style={this.styles.headerIcon}/>
                        {/* </Link> */}
                    </div>
                </div>
                <div style={this.styles.middleContainer}>
                    <div style={this.styles.heading}>
                        <h1>My QR Codes</h1>
                    </div>
                    <div style={this.styles.qrCodeListContainer}>
                        <MyQRCodeList />
                    </div>
                </div>
                <div style={this.styles.footer}>
                    <p>Designed & Developed by <a style={{ textDecoration: 'none' }} href="https://brazsuthar.web.app/"><strong>Braz Suthar</strong></a></p>
                </div>
                {
                    this.state.showModal && 
                    <div style={this.styles.modalContainer}>
                        <div style={this.styles.modal}>
                            <h3 style={this.styles.modalHeading}>Scan QR Code</h3>
                            <p style={this.styles.modalSubHeading}>You can scan QR Code from your Camera or a photo.</p>
                            <div style={this.styles.modalButton}>
                                <label>
                                    Choose Photo
                                    <input ref={this.fileInput} type="file" onChange={() => { this.handleChoosePhoto() }} style={{ display: 'none'}}/>
                                </label>
                            </div>
                            {/* <button onClick={ () => { this.setState({ redirectToUploadImageScreen: true})} } style={this.styles.modalButton}>Photo</button> */}
                            <button onClick={ () => { this.setState({ redirect: true })} } style={this.styles.modalButton}>Camera</button>
                            <button  onClick={() => { this.setState({ showModal: false }) }} style={{...this.styles.modalButton, borderBottomLeftRadius: '0.7rem', borderBottomRightRadius: '0.7rem'}}>Cancel</button>
                        </div>
                    </div>
                }

                <img ref={this.imgRef} src={ this.state.imgUri } style={{ display: 'none' }} />
            
            </div>
        )
    }
}