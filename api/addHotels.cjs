const { MongoClient, ObjectId } = require('mongodb');

async function addHotels() {
    const uri = 'mongodb+srv://devpatel:devpatel@cluster0.gckvbmp.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db('test');
        const collection = database.collection('hotels');

        const hotels = [
            {
                "name": "New Janta",
                "cheapestPrice": 200,
                "address": "char rasta surat",
                "type": "hotel",
                "title": "best non veg hotel in the city",
                "desc": "Experience royal hospitality at Royal Palace hotel, offering elegant rooms and top-notch amenities.",
                "city": "surat",
                "distance": "25",
                "featured": true,
                "photos": [],
                "rating": 4.9,
                "rooms": ["Ocean View Suite", "Beach Villa", "Garden Bungalow"]
            },
        ];

        const result = await collection.insertMany(hotels);
        console.log(`${result.insertedCount} hotels inserted successfully.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

addHotels();
