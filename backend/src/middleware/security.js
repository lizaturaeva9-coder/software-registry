function demoAuth(req, res, next) {
    const userId = req.header("X-Demo-UserId");
    if (!userId) return res.status(401).json({ error: "Unauthorized: Відсутній X-Demo-UserId" });
    
    req.user = { id: parseInt(userId, 10) };
    next();
}


function setSecurityHeaders(req, res, next) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
}


function errorHandler(err, req, res, next) {
    console.error("Помилка:", err.message); 
    
    const isDev = process.env.NODE_ENV === "development";
    
   
    res.status(err.status || 500).json({
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.status ? err.message : "Internal Server Error",
            details: isDev ? err.message : undefined
        }
    });
}

module.exports = { demoAuth, setSecurityHeaders, errorHandler };
