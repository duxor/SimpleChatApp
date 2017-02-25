/**
 * Created by duXor on 2/16/2017.
 */

import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection( 'messages' );