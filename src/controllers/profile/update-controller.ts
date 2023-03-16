import { Request, Response } from 'express';
import { body } from 'express-validator';

import { validate } from '@/middlewares/validate';
import { Gender, SexualOrientation } from '@/types';

const rules = [
  body('firstName').optional(),
  body('lastName').optional(),
  body('description')
    .optional()
    .isLength({ min: 20, max: 200 })
    .withMessage('Description must be between 20 to 200 charaters'),
  body('interests')
    .optional()
    .isArray({
      min: 2,
      max: 8,
    })
    .withMessage('You must provide interests between 2 to 8')
    .custom((interests: string[]) => {
      return interests.every((interest) => typeof interest === 'string');
    })
    .withMessage('Interests must contain strings'),
  body('gender')
    .optional()
    .isIn(Object.values(Gender))
    .withMessage('Gender can be ' + Object.values(Gender).join(', ')),
  body('sexualOrientation')
    .optional()
    .isIn(Object.values(SexualOrientation))
    .withMessage(
      'Sexual Orientation can be ' +
        Object.values(SexualOrientation).join(', '),
    ),
];

export const validation = validate(rules);

export const update = async (req: Request, res: Response) => {
  const fillables = [
    'firstName',
    'lastName',
    'description',
    'gender',
    'sexualOrientation',
    'interests',
  ];

  fillables.forEach((field) => {
    if (req.body[field]) {
      req.user.set(field, req.body[field]);
    }
  });

  await req.user.save();

  res.json(req.user);
};
