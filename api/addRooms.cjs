const { MongoClient, ObjectId } = require('mongodb');

async function addRoomsAndUpdateHotel() {
    const uri = 'mongodb+srv://devpatel:devpatel@cluster0.gckvbmp.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db('test');
        const roomsCollection = database.collection('rooms');
        const roomsData = [
            {
                hotelId: ObjectId("662cdedbc4f7207f59a28ccc"),
                title: "King Room",
                desc: "King size bed, 1 bathroom, balcony",
                price: 100,
                maxPeople: 2,
                roomNumbers: [{ number: 201 }, { number: 202 }]
            },
            {
                hotelId: ObjectId("662cdedbc4f7207f59a28ccc"),
                title: "2 Bed Room",
                desc: "King size bed, 1 bathroom, balcony",
                price: 100,
                maxPeople: 2,
                roomNumbers: [{ number: 301 }, { number: 302 }]
            },
            {
                hotelId: ObjectId("662cdedbc4f7207f59a28ccc"),
                title: "Another Room",
                desc: "King size bed, 1 bathroom, balcony",
                price: 100,
                maxPeople: 2,
                roomNumbers: [{ number: 101 }, { number: 102 }]
            }
        ];

        const roomsResult = await roomsCollection.insertMany(roomsData);
        console.log(`${roomsResult.insertedCount} rooms inserted successfully.`);

        const hotelsCollection = database.collection('hotels');
        const roomIds = roomsResult.insertedIds;
        const updateResult = await hotelsCollection.updateOne(
            { _id: ObjectId("662cdedbc4f7207f59a28ccc") },
            { $set: { rooms: Object.values(roomIds) } }
        );
        console.log(`${updateResult.modifiedCount} hotel updated successfully.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

addRoomsAndUpdateHotel();