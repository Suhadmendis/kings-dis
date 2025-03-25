import { store } from '../../configureStore';
import DataAdapter from '../offline/localData/DataAdapter';
import { getAddresses as getAddressesAPI } from "../url/API";
import _ from "lodash";

export const getAddresses = async () => {
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;
    let adminCustomerID = state.findStore?.adminCustomerID;

    if (internetConnectivity) {
        //get data from the API if has internet
        let res = await getAddressesAPI({
            offset: 0,
            pagesize: 0,
        });
        let data = { addresses: [] };
        if (res && res.addresses) {
            let transformed = _.map(res.addresses, (i) => ({
                webAddressID: i.addressID,
                ...i,
            }));
            data.addresses = transformed;
        }
        return data;
    } else {
        //get data from database if no internet
        const payload = {
            section: 'ADDRESS',
            opration: 'GET',
            data: { adminCustomerID }
        }
        return await DataAdapter(payload);
    }
}
