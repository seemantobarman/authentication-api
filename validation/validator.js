function userSignupValidator(req,res,next) {
    req.check('name','Name is required').notEmpty()
    req.check('email','Email must be maximum 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contail @ symbol')
        .isLength({min:4,max:32})
    req.check('password','Password is required').notEmpty()
    req.check('password')
        .isLength({min:6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Must contain a number')

    const errors = req.validationErrors()
    if(errors){
        console.log(errors)
        const firstError = errors.map(error => error.msg)
        return res.status(400).json({error:firstError})
    }

    next()
}

module.exports.userSignupValidator = userSignupValidator