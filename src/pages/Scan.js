import React, { Component, createRef } from 'react';
import { 
    BsCheckCircle,
    BsXCircle, 
} from "react-icons/bs";
import { 
    MdQrCodeScanner,
    MdOutlineAddBox, 
} from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import Alert from '../components/Alert';

export default class Scan extends Component {
    
    
    constructor(props){
        super(props)
        this.vidRef = createRef()
        this.barcodeDetector = ''
    }

    state = {
        alertError: false,
        alertData: '',
        scannedQRCodeData: '',
        redirectToScannedScreen: false,
    }
       
    componentDidMount(){
        if('BarcodeDetector' in window){
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                this.barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
                    // Use video without audio
                const constraints = { 
                  video: {
                      facingMode: {
                          exact: 'environment'
                      },
                      height: window.screen.availWidth,
                      width: window.screen.availHeight
                  },
                  audio: false,
                }
                
    
                // Start video stream
                navigator.mediaDevices.getUserMedia(constraints).then(stream => { 
                    this.vidRef.current.srcObject = stream 
                })
    
                // this.vidRef.current.requestFullscreen()
    
            }
        }else{
            console.log('no')
        }
    }

    scan = () => { 
        // this.barcodeDetector.detect(this.vidRef.current).then(codes => {
        //     // If no codes exit function
        //     if (codes.length === 0) return;
            
        //     for (const barcode of codes)  {
        //       // Log the barcode to the console
        //       alert(barcode.rawValue)
        //     }
        //   }).catch(err => {
        //     // Log an error if one happens
        //     alert(err);
        //   })
        this.barcodeDetector.detect(this.vidRef.current).then(codes => {
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
    }

    styles = {
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
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            justifyContent: 'space-between',
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            color: '#007aff'
        },
        middleContainer: {
            flexGrow: 1,
        },
        video: {
            width: '100vw',
            height: '100vh',
        }
    }

    handleErrorPopupClick = () => {
        this.setState({alertError: false})
    }
    
    render() {
        if(this.state.redirectToScannedScreen){
            const navigationLink = `/scanned/${ JSON.stringify(this.state.scannedQRCodeData) }`
            return <Navigate to={navigationLink} />
        }

        return (
            <div style={this.styles.mainContainer}>
                { 
                   this.state.alertError && <Alert showModal={true} onClickFunction={this.handleErrorPopupClick} alertData={this.state.alertData}/>
                }
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
                            <div style={this.styles.button} onClick={this.scan}>
                                <MdQrCodeScanner style={{ marginRight: '0.4rem' }}/>
                                Scan 
                            </div>
                        {/* </Link> */}
                    </div>
                </div>

                <div style={this.styles.middleContainer}>
                    <video ref={this.vidRef}  autoPlay style={this.styles.video}></video>
                </div>

            </div>
        )
    }
}