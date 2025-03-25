
import RNFS from 'react-native-fs';

import RNFetchBlob from 'rn-fetch-blob'

const DOWNLOAD = RNFS.DownloadDirectoryPath;
const KINGSSEEDS = DOWNLOAD + '/KingsSeeds';
const ZIPFILE = KINGSSEEDS + '/file1.zip';

export async function DeleteDirectory() {

    
    

    let files = await RNFS.unlink(KINGSSEEDS)
    console.log('========Disk============================');
    // const delete_file_object = files.filter(fileInfo => fileInfo.name == name);

    // let exists = await RNFS.exists(delete_file_object[0].path);
    

    // if(exists){
    //     await RNFS.unlink(exists);
    //     console.log("File Deleted");
    // }else{
    //     console.log("File Not Available")
    // }

     






    //  console.log('====================================');

}


export async function configDirectory() {

    const dirs = RNFetchBlob.fs.dirs;


    let isExists = await RNFS.exists(`${dirs.PictureDir}/KingsSeeds`);
    
    console.log('=======fff====f=========================');
    console.log(RNFS);
    console.log('====================================');
    if (isExists) {
        return "OK";
    }else{
        let created = await RNFS.mkdir(`${dirs.PictureDir}/KingsSeeds`);
        return "OK"
        
    }

}


export async function CheckDirectory() {

    const dirs = RNFetchBlob.fs.dirs;

    
   console.log('====dirs======11==========================');
   console.log(RNFS);
   console.log('====================================');


   


    let files = await RNFS.readDir(`${dirs.DownloadDir}/KingsSeeds`)

    console.log('====dirs======11==========================');
    console.log(files);
    console.log('====================================');

    files.map(fileInfo =>{
        
    
    })
    

    //  console.log('====================================');

}