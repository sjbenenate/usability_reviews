import { Router } from 'express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json('user base route fetched');
});

// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
router.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});

export { router as UsersRouter };
