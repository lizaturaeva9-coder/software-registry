const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cors')()); 


app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Content-Security-Policy", "default-src 'self'"); 
    next();
});

const softwareRoutes = require('./routes/software.routes');
app.use('/api/software', softwareRoutes);


app.use((err, req, res, next) => {
    console.error("Помилка:", err.message); 
    res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Сталася помилка на сервері"
        }
    });
});

app.listen(3000, () => console.log('🚀 Сервер на 3000 порту'));