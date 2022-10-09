#!/usr/bin/env node

import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import GeoWords from '@geo-phrase/geo-words';

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
  {
    name: 'latitude',
    alias: 'a',
    type: Number,
    description: 'Latitude coordinate - must be provided with longitude',
  },
  {
    name: 'longitude',
    alias: 'o',
    type: Number,
    description: 'Longitude coordinate - must be provided with latitude',
  },
  {
    name: 'coordinates',
    alias: 'c',
    type: Number,
    multiple: true,
    description: 'Both latitude and longitude',
  },
  {
    name: 'words',
    alias: 'w',
    type: String,
    multiple: true,
    description: '1 to 4 words from wordlist that points coordinates',
  },
  {
    name: 'number',
    alias: 'n',
    type: Number,
    description: 'Single integer number that describes coordinates from 1 up to 2^53-1',
  },
  {
    name: 'hex',
    alias: 'x',
    type: String,
    description: 'Hex works same as number but written in hex',
  },
  {
    name: 'wordlist',
    alias: 'l',
    type: Boolean,
    description: 'Display wordlist used in transcoding',
  },
];

const sections = [
  {
    header: 'Geo Location CLI',
    content: 'Converts coordinates to words or single number both ways'
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  }
];

const print = gw => {
  const details = gw.locDetails;
  console.log({
    number: gw.num,
    hex: gw.hex,
    words: gw.words.join(' '),
    latitude: gw.latitude,
    longitude: gw.longitude,
    latitudeRange: details.lat.prec,
    longitudeRange: details.lon.prec,
    bitsPrecision: gw.bits.length + 1,
    coordinates: `${gw.latitude} ${gw.longitude}`,
  });
};

const options = commandLineArgs(optionDefinitions);

console.log('input: ', options);

const gw = GeoWords();

const option = Object.keys(options)[0] ?? 'help';
switch (option) {
  case 'help':
    console.log(commandLineUsage(sections));
    break;
  case 'latitude':
  case 'longitude':
    const isErr = typeof options.latitude === 'undefined' || typeof options.longitude === 'undefined';
    if (isErr) throw Error('Latitude and longitude must be provided both');
    gw.bits = 44;
    gw.latitude = options.latitude;
    gw.longitude = options.longitude;
    print(gw);
    break;
  case 'coordinates':
    const [lat, lon] = options.coordinates;
    gw.bits = 44;
    gw.latitude = lat;
    gw.longitude = lon;
    print(gw);
    break;
  case 'words':
    gw.words = options.words;
    print(gw);
    break;
  case 'number':
    gw.num = options.number;
    print(gw);
    break;
  case 'hex':
    gw.hex = options.hex;
    print(gw);
    break;
  case 'wordlist':
    GeoWords.wordlist.map((word, i) => {
      console.log(`${i} ${word}`);
    });
    break;
}
