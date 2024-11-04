import { Router } from 'express';
import { welcome } from '../controller/welcome_controller.js';

const welcomeRouter = Router();

welcomeRouter.get('/', welcome);

export default welcomeRouter;
