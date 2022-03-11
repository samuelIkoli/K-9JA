const Dog = require('../models/dog');
const mongoose = require('mongoose');
require("dotenv").config();


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const saveDogs = async () => {
    await Dog.deleteMany({});
    const liquorice = new Dog({
        name: 'Liquorice',
        age: '6 years old',
        images: [
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643123475/Dogs/Dogs/WhatsApp_Image_2022-01-25_at_3.34.15_PM_rqxjxw.jpg',
                filename: 'YelpCamp/wp31euxqfqos0zlwcefv',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643123478/Dogs/Dogs/WhatsApp_Image_2022-01-25_at_3.37.13_PM_yj2g57.jpg',
                filename: 'YelpCamp/mq5kdvbc4qsm6pxum6wc',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643040024/Dogs/Dogs/130797832_409465336912219_1987342814754400946_n_t64asr.jpg',
                filename: 'YelpCamp/qeta5w0rfbyy9jxqhvjc',
            }
        ],
        description: ['Liquorice is an alpha male in his own rights. He is 6 years old, weighs 45kg and is about 5 foot 8 inches when standing vertically on his hind legs.', 'Although possessing very intimidating looks and actually being very protective as well as territorial, Liquorice is a big baby that loves cuddles, rubs and being groomed.', 'He is the Sire of the current litter that is for sale on this website.']
    });

    const kat = new Dog({
        name: 'Kat',
        age: '1 year, 5 months old',
        images: [
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643052588/Dogs/Dogs/WhatsApp_Image_2022-01-24_at_8.28.27_PM_pytyih.jpg',
                filename: 'YelpCamp/wp31euxqfqos0zlwcefv',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643129815/Dogs/Dogs/WhatsApp_Image_2022-01-25_at_5.54.36_PM_sbnpdd.jpg',
                filename: 'YelpCamp/mq5kdvbc4qsm6pxum6wc',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643040025/Dogs/Dogs/129729151_1023389018138476_6138584697145408090_n_iptkcm.jpg',
                filename: 'YelpCamp/qeta5w0rfbyy9jxqhvjc',
            }
        ],
        description: ['Kat is a year and 5 months old as at the end of January 2022, weighs 37kg and is about 5 foot 3 inches when standing tall on her hind legs.', 'Kat is actually the daughter of Liquorice from his first mistress who broke his heart :-(.', 'This is Kat and her father when he first saw her. She is 7 weeks old in this picture. I.K.R. the picture is very adorable.']
    });

    const puppies = new Dog({
        name: 'Puppies',
        age: 'A few months old',
        images: [
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643385974/Dogs/Dogs/p1_nacicn.jpg',
                filename: 'YelpCamp/wp31euxqfqos0zlwcefv',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643385975/Dogs/Dogs/p2_zxoubv.jpg',
                filename: 'YelpCamp/mq5kdvbc4qsm6pxum6wc',
            },
            {
                url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1643385976/Dogs/Dogs/p3_jbrmne.jpg',
                filename: 'YelpCamp/qeta5w0rfbyy9jxqhvjc',
            }
        ],
        description: ['Very cute, adorable, pure bred, black coated cane corsos ready to be adopted into new homes. Check the contact page to contact me for more information.', 'These babies are a product of Liquorice and his second mistress Mimi.', 'Puppies are 5 weeks old as at the end of January, they have been weaned and are ready to take on the world.']
    });

    await liquorice.save()
    await puppies.save()
    await kat.save()

}
saveDogs()
    .then(() => {
        mongoose.connection.close()
    })
    .catch((e) => { console.log(e) });
