import axios from 'axios';
import Qs from 'qs';

const googleNearbyUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const googleGeoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleApiKey = 'AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8';
const ticketMasterApi = 'PgwtJ22n7fmnNSg2GX7lG6HWnGA5I6Wq';

//Getting the day and one year later for the ticket master call.
const currentDate = new Date();
const currentDateString = currentDate.toISOString();
const splitDate = currentDateString.split('.');
const startDateTime = splitDate[0] + "Z";

const nextYearDate = new Date().setFullYear(currentDate.getFullYear() + 1);
const nextYearDateString = new Date(nextYearDate).toISOString();
const splitNextYearDate = nextYearDateString.split('.');
const endDateTime = splitNextYearDate[0] + "Z";

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

export const getLibraries = (lat,lng) => {
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
      reqUrl: googleNearbyUrl,
      params: {
        key: googleApiKey,
        location: `${lat},${lng}`,
        radius: 3000,
        keyword: 'toronto public library',
        type: 'library',
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}

export const getConcerts = (lat,lng) => {
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
      reqUrl: 'https://app.ticketmaster.com/discovery/v2/events.json',
      params: {
        latlong: `${lat},${lng}`,
        radius: 4,
        unit: 'km',
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        sort: 'date,asc',
        size: 200,
        page: 0,
        classificationName: 'music',
        apikey: ticketMasterApi,
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}

export const getConcertsAgain = (lat,lng,i) => {
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
        reqUrl: 'https://app.ticketmaster.com/discovery/v2/events.json',
        params: {
          latlong: `${lat},${lng}`,
          radius: 4,
          unit: 'km',
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          sort: 'date,asc',
          size: 200,
          page: i,
          classificationName: 'music',
          apikey: ticketMasterApi,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false,
        useCache: true,
      }
    })
} 

export const getLibraryEvents = () => {
  return axios({
    url: 'torontoPublicLibrary.json',
    method: 'GET',
    dataResponse: 'json'
  })
}