import mailchimp from '../mailchimp';
export const subscribeToMailingList = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({
      message: ['Failed to subscribe due to missing email.']
    });
    return;
  }

  try {
    const mailChimpRes = await mailchimp.post('/lists/d8c82b341e', {
      members: [
        {
          email_address: email,
          status: 'subscribed'
        }
      ]
    });
    if (mailChimpRes.error_count === 0) {
      res.status(201).send({ message: 'Successfully subscribed!' });
    } else {
      res.status(400).send({ message: "You've already been subscribed!" });
    }
  } catch (error) {
    res.status(500).send({ message: 'Unknown error occured.' });
  }
};
