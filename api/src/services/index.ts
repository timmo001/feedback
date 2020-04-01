import { Application } from '../declarations';
import feedback from './feedback/feedback.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(feedback);
}
