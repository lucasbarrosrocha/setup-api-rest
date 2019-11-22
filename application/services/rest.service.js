module.exports = {
 
    ok(res, content = {}) {
        res.status(200);
        res.json(content);
    },

    badRequest(res, message, next) {
        res.status(400);
        res.json({ err: message });
        return next(new Error([message]))
    },

    internalError(res, error) {
        res.status(500);
        res.json({ err: error.stack || error });
    }
}