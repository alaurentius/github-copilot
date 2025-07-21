function fizzBuzz(n) {
    if (typeof n !== 'number' || n <= 0) {
        return 'Input must be a positive integer';
    }

    let result = '';
    
    if (n % 3 === 0) {
        result += 'Fizz';
    }
    
    if (n % 5 === 0) {
        result += 'Buzz';
    }
    
    return result || n.toString();
}