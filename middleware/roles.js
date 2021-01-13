const {AccessControl} = require('accesscontrol');

// let grantObjects = {
//     user: {
//         power: {
//             'read:any' : ['*'],
//             'create:own' : ['*'],
//             'update:own' : ['*'],
//             'delete:own' : ['*']
//         },
//         character: {
//             'read:any' : ['*'],
//             'create:any' : ['*'],
//             'update:any' : ['*'],
//             'delete:any' : ['*']
//         }
//     },
//     admin: {
//         power: {
//             'read:any' : ['*'],
//             'create:any' : ['*'],
//             'update:any' : ['*'],
//             'delete:any' : ['*']
//         },
//         character: {
//             'read:any' : ['*'],
//             'create:any' : ['*'],
//             'update:any' : ['*'],
//             'delete:any' : ['*']
//         } im a comment
//     }
// }

// const ac = new AccessControl(grantObjects)

// module.exports = ac

const ac = new AccessControl()

const Roles = () => {
ac.grant('user')
    .readAny('powers')
    .readAny('characters')
    .createOwn('powers')
    .createOwn('characters')
    .updateOwn('powers')
    .updateOwn('characters')
    .deleteOwn('powers')
    .deleteOwn('characters')
ac.grant('admin')
    .extends('user')
    .createAny('powers')
    .createAny('characters')
    .updateAny('powers')
    .updateAny('characters')
    .deleteAny('powers')
    .deleteAny('characters')
}

module.exports = Roles