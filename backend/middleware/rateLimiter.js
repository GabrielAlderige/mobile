import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, resizeBy, next) => {
    try {
        const { sucess } = await ratelimit.limit("my-rate-limit")

        if (!sucess) {
            return res.status(429).json({
                message: "Falaha na chamada, por favor tente denovo depois."
            })
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
}

export default rateLimiter;
