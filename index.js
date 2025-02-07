const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  .then((result) => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
    })
    // .then((result)=>{
    //   return console.log(result.title)
    // })
  })
  .then((newRecipe) => {
    return Recipe.insertMany(data)
    .then((allRecipes) => {
      allRecipes.forEach((element) => {
        console.log('New recipe created:', element.title)
      });
    })
  })
  .then((allRecipes) => {
     return Recipe.findOneAndUpdate({title: "Rigattoni alla Genovese"}, {$set:{duration:100}}, {new: true})
     .then(() => {
       console.log('Recipe modificated')
     })
  })
  .then(() => {
    Recipe.deleteOne({title: 'Carrot Cake'})
    .then(() => {
      console.log('The recipe was eliminited')
      mongoose.connection.close()
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
