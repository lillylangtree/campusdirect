CAMPUS DIRECT
this application locates premises/buildings within a
college/business park campus. Based on the users location
it will direct the user to the building requested using
google maps. It works in conjunction with a location server
that records the geo location of buildings within a campus

to install this application once cloned

> npm install /* from root folder */

** this will install all the required modules
   contained in the package.json file

The application uses SaSS to generate css
files

for automatic update of css files from SaSS files
us gulp

>gulp /* from root directory executes gulpfile.js*/

the gulpfile.js file will start an express server
and watch changes to SaSS files, js and html files.

to ensure compatibility, make css changes to SaSS files
and gulp will auto generate css files

for production change references to css files to min.css in
index.html

with gulp running navigate to http://localhost:4000
to run application. see js/app.js for entry points
   
