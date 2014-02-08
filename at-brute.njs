//
//  at-brute.js
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


// arguments
var packageJSON = require('./package.json');
var optimist = require('optimist')
                .usage('at-brute v'+packageJSON.version+'\nRolandas Razma <rolandas@razma.lt>\n\nUsage: $0 [OPTIONS] --start')
                .options({
                    p: {
                        alias: 'port',
                        default: '/dev/tty.usbserial',
                        describe: 'Specify the serial port to use'
                    },
                    b: {
                        alias: 'baud',
                        default: 115200,
                        describe: 'Specify the baud rate'
                    },
                    o: {
                        alias : 'offset',
                        default : 0,
                        describe: 'Specify offset where to start'
                    },
                    s: {
                        alias : 'separator',
                        default : '+',
                        describe: 'Specify separator of AT and command.'
                    },
                    f: {
                        alias : 'file',
                        describe: 'Log to CSV file'
                    }
                });

var argv = optimist.argv;

// check for --start
if( !argv.start ) {
    optimist.showHelp();
    return;
}


// require
require('colors');
var StringGenerator = require('./modules/stringgenerator/stringgenerator.js').StringGenerator;
var strftime = require('strftime');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var csv;

// do we need logging?
if( argv.file ){
    csv = require('csv');
    csv = csv().to(argv.file, {delimiter: ',', escape: '"'});
    csv.write( ["Command No", "AT", "Response"] );
}

// Connect to port
var serialPort = new SerialPort(argv.port, { baudrate: argv.baud, parser: serialport.parsers.readline("\n") }, false);
serialPort.open(function() {
    
    var dataBuffer = [];
    
    // SerialPort data
    serialPort.on('data', function( data ) {
        data = data.trim();
        
        if( data === "OK" ){
            if( dataBuffer.length === 2 ){
                dataBuffer.push("OK");
            }
            
            if( csv ){
                csv.write( dataBuffer );
            }
            
            console.log("\t"+dataBuffer[2].green);

            tryNextCommand();
        }else if ( data === "ERROR" ){
            tryNextCommand();
        }else if( data.length ){
            dataBuffer.push(data);
        }
    });
    
    // SerialPort close
    serialPort.on('close', function () {
        console.log("\n* "+argv.port+" closed".red);
    });
                
    // SerialPort error
    serialPort.on('error', function( error ) {
        console.log("\n* ERROR - "+error.toString().red);
    });

    var stringGenerator = new StringGenerator(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"], argv.offset);
    var stepNo = 0;

    console.log("* open "+argv.port+" - "+"[OK]".green);
    console.log("* start brute force AT commands with offset " +stringGenerator.offset +" (AT" +argv.separator +stringGenerator.current()+"?)");
    if( argv.file ){
        console.log("* logging to "+argv.file);
    }
    
    function tryNextCommand(){
        dataBuffer = [String(stringGenerator.offset)];

        // generate command
        var command = "AT" +argv.separator +stringGenerator.current() +((stepNo%2)?"=?":"?");
        process.stdout.write("\r["+strftime('%F %T', new Date())+" - "+stringGenerator.offset+"] "+command+((stepNo%2)?"":" "));
        
        // write
        serialPort.write(command+"\n", function(err, results) {
            if( err ) {
                console.log("\n* ERROR - "+err.toString().red);
            }
        });

        if( ++stepNo%2 ){
            stringGenerator.offset++;
        }
    }
    
    tryNextCommand();
});