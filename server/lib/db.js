import {
    createConnection
} from 'mysql';
import config from '../config/dbConfig.json';

const getConnection = (legacyConfig) => {
    let db = createConnection(legacyConfig || config);
    db.connect(err => {
        if (err) {
            console.err('connection err : ' + err);
            return err;
        } else {
            console.info('mysql is connected!')
        }
    });
    return db;
}

const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        let db;
        try {
            db = getConnection();
            db.query(sql, args, (err, rows) => {
                if (err) {
                    console.log('err  : ', err);
                    return reject(err);
                }
                console.log('sql  : ', sql);
                console.log('agrs : ', args);
                console.log(`rows(${rows.length}) : `, rows);
                /*
                resolve({
                    status: 'ok',
                    data: rows
                });*/
                resolve(rows);
            });
        } finally {
            close(db);
        }
    })
}
const close = (db) => {
    if (db) {
        db.end();
    }
}

export default ({
    query,
    getConnection
})