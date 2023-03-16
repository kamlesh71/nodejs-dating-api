import { body } from 'express-validator';

export const firstName = () => body('firstName');
export const interests = () => body('interests');
