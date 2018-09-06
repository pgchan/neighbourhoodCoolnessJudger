import axios from 'axios';
import Qs from 'qs';

const googleNearbyUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const googleGeoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleApiKey = 'AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8';


export const getLatLong = (address) => {
  return axios({
    url: 'https://proxy.hackeryou.com',
    method: 'GET',
    dataResponse: 'json',
    paramsSerializer: function (params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets'
      })
    },
    params: {
      reqUrl: googleGeoCodeUrl,
      params: {
        address: address,
        key: 'AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8',
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}