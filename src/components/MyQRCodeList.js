import LocalStorage from '../LocalStorage'
import emptyListImage from '../images/empty.png'
import { useLiveQuery } from "dexie-react-hooks";
import { 
    MdDelete,
    MdDownload, 
    MdOutlineAddBox
} from "react-icons/md";
import { Remove } from '../LocalStorage'

export default function MyQRCodeList(){
    const allItems = useLiveQuery(() => LocalStorage.qrcode.toArray(), []);
    // console.log(allItems);
    if(!allItems) return (
        <div style={styles.emptyList}>
            <img src={ emptyListImage } style={styles.emptyListImage} />
            <p style={styles.msg}>You have not created any QR Code yet.</p>
            <p style={styles.msg}>Click <span><MdOutlineAddBox style={{ fontSize: '1rem', color: '#007aff' }} /></span> to create your first QR Code.</p>
        </div>
    )
    if(allItems.length == 0) return (
        <div style={styles.emptyList}>
            <img src={ emptyListImage } style={styles.emptyListImage} />
            <p style={styles.msg}>You have not created any QR Code yet.</p>
            <p style={styles.msg}>Click <span><MdOutlineAddBox style={{ fontSize: '1rem', color: '#007aff' }} /></span> to create your first QR Code.</p>
        </div>
    )
    const listItems = allItems.map((qrcode) =>
        <div style={styles.row}>
            <img src={ qrcode.url } style={styles.qrcodeImage}/>
            <h2 style={styles.title}>{qrcode.title}</h2>
            <MdDownload style={styles.icon} onClick={event => { downloadQRCode(qrcode.url) }}/>
            <MdDelete style={styles.icon} onClick={ () => { Remove(qrcode.id) } } />
        </div>
    );
    return <div>{listItems}</div>
}

const downloadQRCode = url => {
    const imageName = JSON.parse(decodeURI(url.split('=')[1].split(';')[0])).title + '.png'
    fetch(url, {
        method: "GET",
        headers: {}
      })
        .then(response => {
          response.arrayBuffer().then(function(buffer) {
            const url_ = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url_;
            link.setAttribute("download", imageName); 
            document.body.appendChild(link);
            link.click();
          });
        })
}

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        margin: '0.8rem 0rem',
        color: '#48484a'
    },
    qrcodeImage: {
        width: "2.5rem",
        height: "2.5rem",
        marginRight: '1.5rem'
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginLeft: '1.5rem',
        fontSize: '1.5rem'
    },
    emptyList: {
        textAlign: 'center',
        padding: '1rem 0rem'
    },  
    emptyListImage: {
        width: '8rem',
        marginBottom: '1rem'
    },
    msg: {
        color: '#8e8e93',
        margin: 0
    },
}