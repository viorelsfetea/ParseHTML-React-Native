'use strict';

var React = require('react-native');

var {
  View,
  Text,
  TouchableHighlight,
  Image
} = React;

var ParseHTMLMapping = {
  'div': {
    mapsTo: View,
    style: {},
    arguments: {}
  },
  'a': {
    mapsTo: Text,
    style: {
      textDecorationLine: 'underline',
      color: 'blue'
    },
    arguments: {

    }
  },
  'b': {
    mapsTo: Text,
    style: {fontWeight: 'bold'},
    arguments: {}
  },
  'strong': {
    mapsTo: Text,
    style: {fontWeight: 'bold'},
    arguments: {}
  },
  'i': {
    mapsTo: Text,
    style: {fontStyle: 'italic'},
    arguments: {}
  },
  'normal': {
    mapsTo: Text,
    style: {fontStyle: 'normal'},
    arguments: {}
  },
  'img': {
    mapsTo: Image,
    style: {height: 100, width: 100},
    arguments: {}
  }
}

module.exports = ParseHTMLMapping;
