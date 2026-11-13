import express, { type Express, type Request, type Response } from 'express';
import { authenticationService } from './service/authentication.service.js';
import { RegisterDTO } from './dto/register.dto.js';
import { validateBody } from './middleware/validation.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { LoginDTO } from './dto/login.dto.js';

const app: Express = express();
app.use(express.json());    //for parsing json from body

app.post(
  '/register',

  validateBody(RegisterDTO),

  async (req: Request, res: Response) => {
    const dto = req.body as RegisterDTO;
    await authenticationService.register(dto);
    res.status(201).json({
      message: "User registered successfully"
    });
  }
);

app.post(
  '/login',

  validateBody(LoginDTO),

  async (req: Request, res: Response) => {
    const dto = req.body as LoginDTO;
    const response = await authenticationService.login(dto);
    res.status(200).json({
      message: "User logged in successfully",
      user: response
    });
  }
);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});