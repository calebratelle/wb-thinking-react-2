// 1. importing packages
import express from "express";
import morgan from "morgan";
import ViteExpress from 'vite-express';

let TEST_DATA = [
    {
        id:1,
        photoURL: "https://rare-gallery.com/thumbnail/1312488-PikachuPikachu.png",
        name: "Pikachu",
        HP: 60,
      specialMove: "Thunder Shock"
    },
    {
        id: 2,
        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4e3a9Sz4gcawpJIzbKMQnzezG-6U1Ua-6g&usqp=CAU",
        name: "Bulbasaur",
        HP: 65,
        specialMove: "Iron Whip"
    },
    {
        id: 3,
        photoURL: "https://e0.pxfuel.com/wallpapers/636/325/desktop-wallpaper-squirtle-pokemon-sticker-squirtle-pokemon-png-transparent-png-squirtle-sunglasses.jpg",
        name: "Squirtle",
        HP: 70,
        specialMove: "Ice Beam"
    },
    
    {
        id:4,
        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3bEGDTEJ29FFTm5ivhZt_3peq0IvTY2X5Q&usqp=CAU",
        name: "Charmander",
        HP: 55,
        specialMove: "Flame Thrower"
    }
];

// 2. setting up app instance
const app = express();
const port = 2319;

// 3. middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());


//4. routes go here
app.get("/pokemon", (req,res) => {
    res.send(TEST_DATA)
})

app.get("/onepokemon/:id", (req, res) => {
    console.log(req.params)
    const {id} = req.params
    let onePokemon = TEST_DATA.filter((el)=>{
        return el.id === +id
    })
    console.log(onePokemon)
    res.send(onePokemon[0])
})
let nextId = 4

app.post("/addpokemon", (req, res) => {
    
    const newPokemon = {
        id: nextId, ...req.body}
        nextId ++
        TEST_DATA.push(newPokemon)

        console.log(TEST_DATA)
    res.send('Pokemon added to the team!')
})

app.delete("/removepokemon/:id", (req,res) => {
    const {id} = req.params
    let index = TEST_DATA.findIndex((el)=>{
        return el.id === +id
    })
    TEST_DATA.splice(index, 1)
    res.send(TEST_DATA)
})

app.put()

// 5. open the server door

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));