import Dexie from 'dexie'

const LocalStorage = new Dexie('MyQRCodes');
LocalStorage.version(1).stores(
  { qrcode: "++id,title,url" }
)

export default LocalStorage

export const Add = async data => {
  await LocalStorage.qrcode.add(data)
}

export const Remove = async id => {
  await LocalStorage.qrcode.delete(id)
}