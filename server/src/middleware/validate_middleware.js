const validate = ( schema ) => async (req,res,next) => {
try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
} catch (error) {
    const errorHandle = {
        status: 422,
        message: error.errors[0].message,
        extraDetails: "Validation Error"
    }
    next(errorHandle)
    //res.status(400).json({msg:});
}
}
module.exports = validate;