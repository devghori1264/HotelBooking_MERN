const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

async function addData() {
    const uri = 'mongodb+srv://devpatel:devpatel@cluster0.gckvbmp.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db('test');
        const usersCollection = database.collection('users');
        const adminPassword = await bcrypt.hash('tas', 10);
        const adminUser = {
            username: 'tas',
            email: 'tas@example.com',
            password: adminPassword,
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const adminResult = await usersCollection.insertOne(adminUser);
        console.log(`${adminResult.insertedCount} admin user inserted successfully.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

addData();