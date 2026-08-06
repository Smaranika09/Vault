const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const Project = require('./models/project');
const Admin = require('./models/Admin');
const Enquiry = require('./models/Enquiry');
const app = express();

connectDB();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/dashboard', async (req, res) => {
  const totalProjects = await Project.countDocuments();
  const totalAdmins = await Admin.countDocuments();
  const totalEnquiries = await Enquiry.countDocuments();
  res.render('dashboard', {
    totalProjects,
    totalAdmins,
    totalEnquiries
  });
});

app.get('/add-project', (req, res) => {
  res.render('add-project', {
    success: req.query.success
  });
});

app.post('/add-project', async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      location: req.body.location,
      category: req.body.category,
      budget: req.body.budget,
      description: req.body.description,
      coverImage: req.body.coverImage
    });
    await newProject.save();
    res.redirect('/add-project?success=true');
  } 
  catch (error) {
    console.log(error);
    res.send('Error Saving Project');
  }
});

app.get('/manage-projects', async (req, res) => {
  const projects = await Project.find();
  res.render('manage-projects', {
    projects
  });
});

app.get('/edit-projects/:id', async (req, res) => {
  const project = await Project.findById(
    req.params.id
  );
  res.render('edit-projects', {
    project
  });
});

app.post('/edit-projects/:id', async (req, res) => {
  await Project.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      location: req.body.location,
      category: req.body.category,
      budget: req.body.budget,
      description: req.body.description,
      coverImage: req.body.coverImage
    }
  );
  res.redirect('/manage-projects');
});

app.get('/delete-project/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/manage-projects');
});

app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.render('projects', {
    projects
  });
});

app.get('/admin-login', (req, res) => {
  res.render('admin-login', {
    error: req.query.error
  });
});

app.post('/admin-login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === process.env.ADMIN_EMAIL && password ===  process.env.ADMIN_PASSWORD) {
    return res.redirect('/dashboard');
  }
  res.redirect('/admin-login?error=true');
});

app.post('/contact', async (req, res) => {
  try {
    const newEnquiry = new Enquiry({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      message: req.body.message
    });
    await newEnquiry.save();
    res.send('Enquiry Submitted Successfully');
  } 
  catch (error) {
    console.log(error);
    res.send('Error Submitting Enquiry');
  }
});

app.get('/manage-enquiries', async (req, res) => {
  const enquiries = await Enquiry.find().sort({ 
    createdAt: -1 
  });
  res.render('manage-enquiries', {
    enquiries
  });
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});