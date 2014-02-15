at-brute
==========
https://github.com/RolandasRazma/at-brute

## DESCRIPTION:

at-brute is AT commands brute-forcer.
What do you do when you have COM interface with unknown AT commands set? You brute-force it of course! 


## Usage
```sh
$ node ./at-brute.njs [OPTIONS] --start
```

### Options:
```
  -p, --port       Specify the serial port to use                                                  [default: "/dev/tty.usbserial"]
  -b, --baud       Specify the baud rate                                                           [default: 115200]
  -o, --offset     Specify offset where to start                                                   [default: 0]
  -s, --separator  Specify separator of AT and command.                                            [default: "+"]
  -t, --timeout    Specify timeout in seconds for command response before retrying. 0 to disable.  [default: 0]
  -f, --file       Log to CSV file                                                               
  --ESLP           Start with AT+ESLP=0 - no sleep on mobile devices                               [default: false]
```

## SCREENSHOT: 

![ScreenShot](http://s28.postimg.org/nky7x4v2l/at_brute.png)

## LICENSE:

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2014 [Rolandas Razma](http://razma.lt)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OT