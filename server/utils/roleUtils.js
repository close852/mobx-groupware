export function requireRole(role) {
    return function (req, res, next) {
        let roleArr = (req.session.role) || [];

        console.log(req.originalUrl, 'method role : ', role, ', user role : ', roleArr);

        for (let inRole of roleArr) {
            // console.log(role.includes(inRole["ROLE"]));
            if (role.includes(inRole["ROLE"])) {
                return next();
            }
        }

        return res.status(403).json({
            error: "권한 없음",
            code: 99
        })
    }
}