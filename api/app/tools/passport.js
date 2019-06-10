
// Passport authentication
const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
// const JWT_SECRET  = process.env.JSON_WEB_TOKEN   

//Hashing and encrypting
const bcrypt = require('bcryptjs');

//databases
const schemas = require('../../src/models/index').schemas

//Local strategy
/**
 * Notice, passport requires username, we will treat it either as an email or a username
 */
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done) => {
    //Find the user given the username
    const UserModel = schemas.User
    const db_user = await UserModel.findByEmail(email)

    //they do not exist 
    if (! db_user) return done(null, false)

    //Check if the password is correct
    bcrypt.compare(password, db_user.password, function (err, res) {

        if (err) return done(err, false)
        delete db_user.password

        if (res){
            const user = {
                firstname : db_user.firstname,
                lastname : db_user.lastname,
                email: db_user.email
            }
            return done(null, user)
        } 
        else return done(null, false)
    }); 
}));


// //JSON web token strategy
// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey : JWT_SECRET
// }, async(payload, done) => {
//     try {
//         //find the user in the token
//         let text = qStrings.selectViaId;
//         let values = [payload.sub]; 
//         console.log(text, values)
//         query(text, values, (err, result) => {
//             if (err) throw new Error ('database error')
//             //user does not exist
//             if (result.rowCount == 0 ) return (null, false)
//             console.log('I am here')
//             return done(null, result.rows[0])            
//         });

//     } catch (error) {
//         return done(error, false)
//     }
// }));