export default function(number, separator) {
    number += '';
    separator = ( separator == undefined ) ? ' ' : separator;

    var result = '', arr = [];

    for (var i = 0; i < number.length; i++) {
            arr.push(number[i]);
                    
            if ( (i - number.length) % 3 == 0 && i != 0) {
            arr[i] = separator + arr[i];
            };

            result += arr[i];
    };

    return result;
}