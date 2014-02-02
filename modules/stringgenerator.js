//
//  stringgenerator.js
//  at-brute
//
//  Created by Rolandas Razma on 02/02/2014.
//
//  Copyright (c) 2013 Rolandas Razma <rolandas@razma.lt>
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//


function StringGenerator( chars, offset ) {
    this.chars = chars;
    this.offset= offset;
}

StringGenerator.prototype = {

    next: function() {
        this.offset++;
        return this.current();
    },

    current: function() {
        return this.stringAtIndex( this.offset );
    },
    
    stringAtIndex: function( index ) {
      var i = 1;
      var res = [];
      var charsLength = this.chars.length;
      
      while( index >= 0 ){
          var a = Math.floor(index /Math.pow(charsLength, i -1)) %charsLength;
          res.push(this.chars[a]);
          index -= Math.pow(charsLength, i);
          i += 1;
      }

      return res.reverse().join('');
    }

};

exports.StringGenerator = StringGenerator;