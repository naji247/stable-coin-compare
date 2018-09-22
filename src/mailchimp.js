import Mailchimp from 'mailchimp-api-v3';
import { MAILCHIMP_API_KEY } from './secrets';

export default new Mailchimp(MAILCHIMP_API_KEY);
