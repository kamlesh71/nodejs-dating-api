import mongoose, { HydratedDocument, Model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Hash } from '@/services/hash';
import { Gender, SexualOrientation } from '@/types';

export interface UserAttr {
  firstName: string;
  lastName: string;
  email: string;
  gender?: Gender;
  sexualOrientation?: SexualOrientation;
  description?: string;
  interests?: string[];
  photos?: [
    {
      _id: mongoose.Types.ObjectId;
      text: string;
    },
  ];
  password: string;
  location?: number[];
}

export type UserDoc = HydratedDocument<UserAttr, UserMethods>;

interface UserMethods {
  fullName(): string;
  generateToken(): string;
}

interface UserModel extends Model<UserAttr, {}, UserMethods> {
  build(values: UserAttr): UserDoc;
}

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const userSchema = new Schema<UserAttr, UserModel>(
  {
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
    gender: {
      type: String,
      required: false,
    },
    sexualOrientation: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    interests: {
      type: [String],
      required: false,
    },
    photos: {
      type: [
        {
          _id: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      required: false,
      type: pointSchema,
      index: '2dsphere',
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Hash.make(this.get('password') as string);
    this.set('password', hashed);
  }
  done();
});

userSchema.method('generateToken', function generateToken() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_KEY,
  );
});

userSchema.static('build', function (attrs) {
  return new User(attrs);
});

const User = mongoose.model<UserAttr, UserModel>('User', userSchema);

export { User };
