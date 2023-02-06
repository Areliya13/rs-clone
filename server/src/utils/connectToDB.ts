import { connect } from 'mongoose';
import { urlDB } from '../config';

export const connectToDB = async () => {
    await connect(urlDB);
}