import axios from 'axios';
import Qs from 'qs';

const googleNearbyUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const googleGeoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleApiKey = 'AIzaSyAfczrbXkzBLOm5op0o4R96gdqjJaKHrm8';
const ticketMasterApi = 'PgwtJ22n7fmnNSg2GX7lG6HWnGA5I6Wq'


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

export const getLibraries = (lat, lng) => {
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
        radius: 4000,
        keyword: 'library',
        type: 'library',
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}

export const getConcerts = () => {
  return axios({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json',
    method: 'GET',
    dataResponse: 'json', 
    params: {
      // latlong: `${lat},${long}`,
      latlong: `43.6547394,-79.385519`,
      radius: 4,
      unit: 'km',
      startDateTime: '2018-01-01T00:00:00Z',
      endDateTime: '2018-12-31T00:00:00Z',
      sort: 'date,asc',
      size: 100,
      classificationName: 'concert',
      apikey: ticketMasterApi,
    }
  })
}

export const getLibraryEvents = () => {
  return axios({
    url: '/public/torontoPublicLibrary.json',
    method: 'GET',
    dataResponse: 'json'
  })
}