import express, { type Express, type Request, type Response } from 'express';
import { authenticationService } from './service/authentication.service.js';
import { RegisterDTO } from './dto/register.dto.js';
import { validateBody } from './middleware/validation.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { LoginDTO } from './dto/login.dto.js';
import { clientId, googleClient } from './config/google.js';
import { AppError } from './error/app-error.js';
import cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import { connectRedis } from './config/redis.js';

function setResponseCookie(response: Response, refreshToken: string): void{
  response.cookie(
    'refresh_token',
    refreshToken,
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 //must match JWT_REFRESH_EXPIRES_IN
    }
  )
}


const app: Express = express();
app.use(express.json());    //for parsing json from body

app.use(cookieParser());

await connectRedis();

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
    setResponseCookie(res, response.refreshToken);
    res.status(200).json({
      message: "User logged in successfully",
      user: response.user,
      accessToken: response.accessToken
    });
  }
);

app.get(
  '/auth/google',
  (req, res) => {
    const state = randomBytes(32).toString('hex');
    const url = googleClient.generateAuthUrl({
      scope: ['openid', 'email', 'profile'],
      prompt: 'select_account',
      state: state
    });

    res.cookie('oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000,  //10 minutes
      secure: process.env.NODE_ENV === 'production'
    });

    res.redirect(url);
  }
)

app.get(
  '/auth/google/callback',
  async (req, res) => {
    const {code, error} = req.query;

    if(error){
      throw new AppError(400, 'Google sign in was canceled or denied');
    }

    if(!req.query.state || !req.cookies.oauth_state || req.query.state !== req.cookies.oauth_state){
      throw new AppError(400, 'Invalid or missing OAuth state');
    }
    res.clearCookie('oauth_state')

    if(!code || typeof code !== 'string'){
      throw new AppError(400, 'Missing authorisation code');
    }

    try{
      var tokens = (await googleClient.getToken(code)).tokens;
    }
    catch{
      throw new AppError(400, 'Invalid or expired authorization code');
    }

    const idToken = tokens.id_token;
    if(!idToken){
      throw new AppError(502, 'Missing id token');
    } 
    else{
      try{
        var ticket = await googleClient.verifyIdToken({
          idToken: idToken,
          audience: clientId
        })
      }
      catch{
        throw new AppError(401, 'Invalid Google identity token');
      }

    }

    const payload = ticket.getPayload();
    if(!payload || !payload.sub || !payload.email){
      throw new AppError(502, 'Missing or invalid ticket payload');
    }
    if(!payload.email_verified){
      throw new AppError(403, 'Email not verified');
    }

    const result = await authenticationService.signInWithGoogle({ sub: payload.sub, email: payload.email });
    setResponseCookie(res, result.refreshToken);

    res.json({ 
      message: 'Signed in with Google', 
      user: result.user,
      accessToken: result.accessToken
    })
  }
);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
