import { RoboStatistics } from '../model'
import { User } from '../model/user_model'
import { Request, Response } from 'express'
import Joi from 'joi'
// @ts-ignore
import bcrypt from 'bcryptjs'
export const insertData = async (req: Request, res: Response) => {
  try {
    await RoboStatistics.insertMany([
      {
        riskScore: 0,
        nigerianStocks: '18%',
        foriegnStock: '4%',
        techStocks: '2%',
        emergingStocks: '7%',
        nigerianBonds: '35%',
        foriegnBonds: '15%',
        commodities: '7%',
        realEstate: '12%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 1,
        nigerianStocks: '20%',
        foriegnStock: '5%',
        techStocks: '3%',
        emergingStocks: '7%',
        nigerianBonds: '35%',
        foriegnBonds: '6%',
        commodities: '12%',
        realEstate: '12%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 2,
        nigerianStocks: '23%',
        foriegnStock: '5%',
        techStocks: '4%',
        emergingStocks: '7%',
        nigerianBonds: '14%',
        foriegnBonds: '12%',
        commodities: '12%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 3,
        nigerianStocks: '26%',
        foriegnStock: '6%',
        techStocks: '4%',
        emergingStocks: '7%',
        nigerianBonds: '35%',
        foriegnBonds: '10%',
        commodities: '12%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 4,
        nigerianStocks: '29%',
        foriegnStock: '7%',
        techStocks: '5%',
        emergingStocks: '6%',
        nigerianBonds: '35%',
        foriegnBonds: '6%',
        commodities: '12%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 5,
        nigerianStocks: '31%',
        foriegnStock: '8%',
        techStocks: '6%',
        emergingStocks: '5%',
        nigerianBonds: '35%',
        foriegnBonds: '3%',
        commodities: '12%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 6,
        nigerianStocks: '35%',
        foriegnStock: '8%',
        techStocks: '7%',
        emergingStocks: '3%',
        nigerianBonds: '35%',
        foriegnBonds: '12%',
        commodities: '0%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 7,
        nigerianStocks: '45%',
        foriegnStock: '13%',
        techStocks: '12%',
        emergingStocks: '7%',
        nigerianBonds: '23%',
        foriegnBonds: '0%',
        commodities: '0%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 8,
        nigerianStocks: '45%',
        foriegnStock: '15%',
        techStocks: '15%',
        emergingStocks: '9%',
        nigerianBond: '16%',
        foriegnBonds: '0%',
        commodities: '0%',
        realEstate: '0%',
        tbills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 9,
        nigerianStocks: '45%',
        foriegnStock: '18%',
        techStocks: '17%',
        emergingStocks: '11%',
        nigerianBonds: '9%',
        foriegnBonds: '0%',
        commodities: '0%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
      {
        riskScore: 10,
        nigerianStocks: '45%',
        foriegnStock: '20%',
        techStocks: '19%',
        emergingStocks: '14%',
        nigerianBonds: '2%',
        foriegnBonds: '0%',
        commodities: '0%',
        realEstate: '0%',
        tBills: '0%',
        alternative: '0%',
      },
    ])
    res.status(200).send('data inserted successfully')
  } catch (error) {
    res.status(500).send('error inserting data')
  }
}
export const home = async (req: Request, res: Response) => {
  const riskScore = req.params.riskScore
  res
    .status(200)
    .send(
      '<div><p>Here are the endpoints available</p><ul><li>GET: /?riskScore={number}</li><li>POST: /register</li></ul></div>',
    )
}
export const findRiskScore = async (req: Request, res: Response) => {
  const riskScore = req.params.riskScore

  try {
    const data = await RoboStatistics.findOne({ riskScore })
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ error: 'RISK_SCORE_NOT_FOUND' })
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, duration, goal, amount, riskScore, email, password } = req.body

  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const RegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    duration: Joi.string().min(4).max(20).required(),
    goal: Joi.string().min(4).max(20).required(),
    amount: Joi.string().min(3).max(20).required(),
    riskScore: Joi.number().min(0).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(RegExp(pattern))
      .min(6)
      .max(12)
      .required(),
  })
  const { error, value } = RegisterSchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
   return res.status(400).send({ error: error.details });
  }

  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt)

  try {
    const newUser = new User({
      name,
      duration,
      goal,
      amount,
      riskScore,
      email,
      password: hash,
    })
    await newUser.save()
    const advice = await RoboStatistics.findOne({ riskScore })
    res
      .status(200)
      .json({ advice, name, duration, goal, amount, riskScore, email })
  } catch (error) {
    res.status(500).json({ error: 'error registering user' })
  }
}
