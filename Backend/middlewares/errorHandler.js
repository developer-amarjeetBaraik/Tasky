import DevError from "../errors/devError.js";
import AppError from "../errors/appError.js";

const errorHandler = (err, req, res, next) => {
    // Developer error (internal mistake)
    if (err instanceof DevError) {
        // console.error("🚨 Developer Error:", err.message);
        console.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

    // Known application error (user's fault)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            success: false,
            message: err.message,
        });
    }

    // Unknown error
    console.error("💥 Unexpected Error:", err);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
};


export default errorHandler;
