import mongoose from 'mongoose';

const dbConnection = (): void => {
    const dbUrl:string = process.env.MONGODB_URI || '';
    mongoose.connect(dbUrl)
        .then(() => console.log('Database Connection Success'))
        .catch((err: Error) => console.log(`Connection With Database Failed. Reason ${err.message}`));
};

export default dbConnection();