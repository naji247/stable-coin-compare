import request from 'request-promise';
import Feedback from '../data/models/Feedback';
import moment from 'moment';

export const postFeedback = async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    res.status(400).send({
      message: ['Required field: "reason".']
    });
    return;
  }

  try {
    const feedback = Feedback.build({
      reason,
      created_at: moment(),
      updated_at: moment()
    });

    const newFeedback = await feedback.save();
    res.status(201).send(newFeedback);
  } catch (error) {
    res.status(500).send({ message: 'Unknown error occured.' });
  }
};
