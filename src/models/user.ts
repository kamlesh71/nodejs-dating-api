import { Hash } from '@/services/hash';
import mongoose, { HydratedDocument, Model, Schema } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUserMethods {
  fullName(): string;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  build(values: IUser): HydratedDocument<IUser, IUserMethods>;
}

const userSchema = new Schema<IUser, IUserModel>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Hash.make(this.get('password') as string);
    this.set('password', hashed);
  }
  done();
});

userSchema.static('build', function (attrs) {
  return new User(attrs);
});

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export { User };
