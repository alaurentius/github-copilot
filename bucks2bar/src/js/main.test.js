// filepath: bucks2bar/src/js/main.test.js
describe('Username validation regex', () => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;

    test('valid username passes', () => {
        expect(regex.test('Password1!')).toBe(true);
        expect(regex.test('A1b2c3d@')).toBe(true);
        expect(regex.test('Test123$')).toBe(true);
    });

    test('missing uppercase fails', () => {
        expect(regex.test('password1!')).toBe(false);
    });

    test('missing digit fails', () => {
        expect(regex.test('Password!')).toBe(false);
    });

    test('missing special character fails', () => {
        expect(regex.test('Password1')).toBe(false);
    });

    test('less than 8 characters fails', () => {
        expect(regex.test('Pass1!')).toBe(false);
        expect(regex.test('A1b@')).toBe(false);
    });

    test('only special characters fails', () => {
        expect(regex.test('!@#$%^&*')).toBe(false);
    });

    test('only digits fails', () => {
        expect(regex.test('12345678')).toBe(false);
    });

    test('only lowercase letters fails', () => {
        expect(regex.test('abcdefgh')).toBe(false);
    });

    test('only uppercase letters fails', () => {
        expect(regex.test('ABCDEFGH')).toBe(false);
    });

    test('valid username with multiple special characters passes', () => {
        expect(regex.test('Abcdef1!@')).toBe(true);
    });

    test('username with spaces fails', () => {
        expect(regex.test('Password 1!')).toBe(false);
    });

    test('username with unsupported special character fails', () => {
        expect(regex.test('Password1#')).toBe(false); // '#' is not in the allowed set
    });

    test('username with only allowed special characters passes', () => {
        expect(regex.test('A1b2c3d~')).toBe(true);
    });

    test('username with more than 8 characters and all requirements passes', () => {
        expect(regex.test('Abcdefg1!')).toBe(true);
    });

    test('username with exactly 8 characters and all requirements passes', () => {
        expect(regex.test('A1b2c3d@')).toBe(true);
    });

    test('username with less than 8 characters and all requirements fails', () => {
        expect(regex.test('A1b@c')).toBe(false);
    });
});