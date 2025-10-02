//this is basically for handling errors we will pass the function which will return function which handling error
module.exports = (fn) =>{
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    };
};