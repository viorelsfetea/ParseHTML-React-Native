/*
ParseHTML-React-Native (Version 0.1)
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/ParseHTML-React-Native
*/

'use strict';

var React = require('react-native');
var ParseHTMLMapping = require('./ParseHTMLMapping');
var DOMParser = require('xmldom').DOMParser

var TYPE_ELEMENT = 1;
var TYPE_TEXT = 3;

var {
  View,
  Text,
  StyleSheet,
  LinkingIOS
} = React;

var ParseHTML = React.createClass({
  parseNode: function(nodes){
    var returnValue = [];

    //Why is NodeList not an Array? see https://developer.mozilla.org/en-US/docs/Web/API/NodeList
    for (var i = 0; i < nodes.length; i++) {
      if( nodes[i].nodeType === TYPE_ELEMENT ) {
          returnValue.push(
            this.createElement(nodes[i], this.parseNode(nodes[i].childNodes))
          );
      } else if( nodes[i].nodeType === TYPE_TEXT ) {
        returnValue.push(React.createElement(Text, null, nodes[i].data));
      }
    }

    return returnValue;
  },
  createElement: function(node, children) {
    var attributes = {
      style: ParseHTMLMapping[node.tagName]['style'],
      key: node.columnNumber
    }

    if( node.tagName === 'a' ) {
      attributes['onPress'] = () => this.handlePress(node.getAttribute('href'));
    }

    if( node.tagName === 'img' ) {
      attributes['source'] = {uri: node.getAttribute('src')};
    }

    return React.createElement(
      ParseHTMLMapping[node.tagName]['mapsTo'],
      attributes,
      children
    )
  },
  handlePress: function(url) {
    LinkingIOS.openURL(url);
  },
  _buildHTMLParseTree: function(html_code){
    var doc = new DOMParser().parseFromString(html_code, 'text/html');

    return this.parseNode(doc.childNodes)[0];
  },
  _decodeHTMLEntities: function(str){
    return String(str)
      .replace(/&#x2F;/g, '/')
      .replace(/&#x27;/g, '\'')
      .replace(/&quot;/g, '\"')
      .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1")
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/<br(>|\s|\/)*/g, '\n');
  },
  render: function() {
    return (this._buildHTMLParseTree(this._decodeHTMLEntities(this.props.code)));
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
});


module.exports = ParseHTML;
