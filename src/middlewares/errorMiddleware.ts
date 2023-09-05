import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../Error/CustomError'

type CustomErr = {
  status: number;
  message: string;
}

export const errorMiddleware = (err: Error | CustomErr | CustomError, _req: Request, res: Response, _next: NextFunction) => {
  // console.log(err)
  if(err instanceof CustomError) {
    res.status(err.status).json({ message: err.message })
    
    return
  }
  if(err instanceof Error) {
      // console.error(err)
      
      res.status(500).json({ message: 'Internal server error.' })
      
      return
    }

    res.status(err.status).json({ message: err.message })

  }

  
