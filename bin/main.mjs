#!/usr/bin/env node

import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

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
    name: 'coords',
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
];

const sections = [
  {
    header: 'Geo Location CLI',
    content: 'Converts coordinates to words or single number both ways'
  },
  // {
  //   header: 'Synopsis',
  //   content: [
  //     '$ example [{bold --timeout} {underline ms}] {bold --src} {underline file} ...',
  //     '$ example {bold --help}'
  //   ]
  // },
  {
    header: 'Options',
    optionList: optionDefinitions,
  }
];

const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

if (options.help || Object.keys(options).length === 0) {
  console.log(usage);
} else {

}

