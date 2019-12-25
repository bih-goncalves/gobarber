import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    // check if user is provider
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // first, you need an ID to get updates
    // second, the object to change
    // third, if you want a select after updating

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true },
    );

    return res.json(notification);
  }
}

export default new NotificationController();
