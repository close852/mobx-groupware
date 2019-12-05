import moment from 'moment'
const now = () => {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}
export {
    now
}
