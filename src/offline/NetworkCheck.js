import { useNetInfo } from '@react-native-community/netinfo';



function NetWorkCheck() {
    const netinfo = useNetInfo();

    let connectionStatus = { status: true, message: 'Initial' };
    // if (!netinfo.isConnected) {
    //     connectionStatus = { status: false, message: 'Your Network Connection is not Working' };
    // }

console.log(netinfo);



    // if (!netinfo.isInternetReachable) {
    //     connectionStatus = { status: false, message: 'Your Network Connection is not Reachable' };
    // }

    return connectionStatus;
}

export default NetWorkCheck;