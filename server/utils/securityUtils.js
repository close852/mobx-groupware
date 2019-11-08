import sha256 from 'sha256'

export function passwordEncode(plainPassword) {
    return sha256(plainPassword);
}
export function passwordCompare(plainPassword, cryptoPassword) {
    return sha256(plainPassword) === cryptoPassword;
}