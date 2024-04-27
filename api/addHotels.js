import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';


// MongoDB connection URI
const uri = 'mongodb+srv://devpatel:devpatel@cluster0.gckvbmp.mongodb.net/?retryWrites=true&w=majority';

// Function to add hotels to the database
async function addHotels() {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        // Access the database and collection
        const database = client.db('booking');
        const collection = database.collection('hotels');

        // Hotel data to be inserted
        const hotels = [
            {
                _id: ObjectId('662aldde3c0c9e939d7f210e'),
                name: "Amiras",
                cheapestPrice: 150,
                address: "Gunjan",
                type: "hotel",
                title: "best veg hotel in the city",
                desc: "hotel description",
                city: "vapi",
                distance: "190",
                featured: false,
                photos: [],
                rating: 5,
                rooms: []
            },
            {
                _id: ObjectId('662ale763c0c9e939d7f210f'),
                name: "New Janta",
                cheapestPrice: 200,
                address: "char rasta",
                type: "hotel",
                title: "best non veg hotel in the city",
                desc: "hotel description",
                city: "vapi",
                distance: "250",
                featured: false,
                photos: [],
                rating: 5,
                rooms: []
            }
        ];

        // Insert hotel data into the collection
        const result = await collection.insertMany(hotels);
        console.log(`${result.insertedCount} hotels inserted successfully.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function to add hotels
addHotels();
