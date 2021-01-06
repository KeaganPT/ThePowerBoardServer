const {Roles} = require('./roles')

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            console.log(req.user.role)
            const permission = Roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to preform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports =  grantAccess;