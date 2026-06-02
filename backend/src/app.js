const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users.routes');
const softwareRoutes = require('./routes/software.routes');
const licensesRoutes = require('./routes/licenses.routes');
const requestsRoutes = require('./routes/requests.routes');

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
});

const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS: origin is not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    
    allowedHeaders: ['Content-Type', 'X-Demo-UserId'] 
}));

app.options(/.*/, cors());


app.use((req, res, next) => {
   
    if (req.path === '/') return next();

    const userId = req.header("X-Demo-UserId");
    if (!userId) {
        return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Відсутній заголовок X-Demo-UserId" } });
    }
    req.user = { id: parseInt(userId, 10) };
    next();
});

app.use('/api/users', usersRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/licenses', licensesRoutes);
app.use('/api/requests', requestsRoutes); 

app.get('/', (req, res) => {
    res.send('<h1>Сервер працює!</h1><p>Переходь на <a href="/api/users">/api/users</a></p>');
});


app.use((err, req, res, next) => {
    const isDev = process.env.NODE_ENV === "development";
    const status = err.status || 500;
    
    res.status(status).json({
        error: {
            code: err.code || "INTERNAL_ERROR",
            
            message: status < 500 ? err.message : "Неочікувана помилка сервера", 
           
            details: isDev ? (err.details || err.message || err.stack) : undefined
        }
    });
});

module.exports = app;