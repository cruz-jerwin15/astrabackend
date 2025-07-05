// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const formRoutes = require('./routes/formRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');
const healthRoutes = require('./routes/healthRoutes');
const responseRoutes = require('./routes/responseRoutes');
const timeRoutes = require('./routes/timeRoutes');


app.use(cors()); // Allow all origins (dev)
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/healths', healthRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/times', timeRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports=app;