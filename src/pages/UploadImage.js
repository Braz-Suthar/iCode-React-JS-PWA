import React, { Component, createRef } from 'react';
import { 
    BsCheckCircle,
    BsXCircle, 
} from "react-icons/bs";
import { 
    MdQrCodeScanner,
    MdOutlineAddBox, 
} from "react-icons/md";
import { Link } from "react-router-dom";

export default class UploadImage extends Component {
    constructor(props){
        super(props)
        this.imgRef = createRef()
        this.barcodeDetector = ''
        this.fileInput = createRef()
    }

    state = {
        imgUri: ''
    }

    componentDidMount(){
        // if('BarcodeDetector' in window){
        //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //         this.barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
        //     }
        // }else{
        //     console.log('no')
        // }
    }

    scan = () => { 
        // this.barcodeDetector.detect(this.imgRef.current).then(codes => {
        //     // If no codes exit function
        //     if (codes.length === 0){
        //         return;
        //     } 
            
        //     for (const barcode of codes)  {
        //       // Log the barcode to the console
        //       alert(barcode.rawValue)
        //     }
        //   }).catch(err => {
        //     // Log an error if one happens
        //     alert(err);
        //   })
    }

    handleSubmit = () => { 
        console.log(this.fileInput.current.files[0])
        this.setState({ 
            imgUri: URL.createObjectURL(this.fileInput.current.files[0])
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
            width: '100vw',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '-99999999',
        },
        image: {
            maxWidth: '100vw',
            height: 'auto',
            display: 'none',
        },
        footer: {
            position: 'fixed',
            bottom: 0,
            width: '100vw',
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
            padding: '0rem 0rem 0.1rem 0rem'
        },
        footerBtn: {
            border: 'none',
            outline: 'none',
            padding: '0.4rem 0rem',
            borderTop: '0.05rem solid #e0e0e0',
            color: '#007aff',
            backgroundColor: 'rgba(0,0,0,0)'
        }
    }

    render() {
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
                            <div style={this.styles.button} onClick={this.scan}>
                                <MdQrCodeScanner style={{ marginRight: '0.4rem' }}/>
                                Scan 
                            </div>
                        {/* </Link> */}
                    </div>
                </div>

                <div style={this.styles.middleContainer}>
                    <img ref={this.imgRef} src={ this.state.imgUri } style={this.styles.image} />
                </div>

                <div style={this.styles.footer}>
                    <div style={this.styles.footerBtn}>
                        <label>
                            Choose Photo
                            <input ref={this.fileInput} type="file" onChange={() => { this.setState({ imgUri: URL.createObjectURL(this.fileInput.current.files[0]) }) }} style={{ display: 'none'}}/>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
