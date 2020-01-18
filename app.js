const express = require('express');
const app = express();

const { data } = require('./data.json');
const  { projects } = data;

//Set up Pug template view engine here
app.set('view engine', 'pug');

// This is our Express static route for image, css and javascript plugins
app.use('/static', express.static('public'));

// Here we include our main routes files
app.get('/', (req, res) => {
    res.render('index', { projects } );
});

app.get('/about', (req, res) => {
    res.render('about', { projects });    
});

app.get('/project/:id', (req, res) => {
    const projid = req.params.id;
    const prod = projects.find( ({ id }) => id === +projid );
    if ( prod ){
        res.render('project', { prod } );  
    }else {
        res.redirect('/error');
    }    
});

// Error message and handler. This middle ware will set our Error object so we can use its properties to log errors.
app.use((req,res,next) => {
    const err = new Error('That page does not exist.');
    err.status = 404; // Setting the error status for pages not found if user navigates to a non-existing page
    next(err);
});
// render error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err );
    if( err.status = 404 ){
        console.error('/error/404 - That page doesn\'t exist!' );
    }
});


app.listen(3000, () =>   console.log('This app is listening on port 3000!'));