// Mock auth storage in localStorage
const USERS_KEY = 'mock_users';
const CURRENT_USER_KEY = 'user';
const TOKEN_KEY = 'token';

const getMockUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveMockUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Mock register
export const mockRegister = ({ name, email, password }) => {
  const users = getMockUsers();
  if (users.some(u => u.email === email)) {
    throw { response: { data: { message: 'Email already registered' } } };
  }
  const newUser = {
    _id: `user_${Date.now()}`,
    name,
    email,
    totalPoints: 0,
    currentStreak: 0,
    badgesEarned: 0,
    role: 'student'
  };
  users.push({ ...newUser, password });
  saveMockUsers(users);
  
  const token = `mock_token_${newUser._id}`;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  return { data: { token, user: newUser } };
};

// Mock login
export const mockLogin = ({ email, password }) => {
  const users = getMockUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw { response: { data: { message: 'Invalid email or password' } } };
  }
  const token = `mock_token_${user._id}`;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { data: { token, user } };
};

// Mock get current user stats
export const mockGetUserStats = () => {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  if (!user) throw { response: { data: { message: 'Unauthorized' } } };
  
  return {
    data: {
      data: {
        totalPoints: user.totalPoints || 0,
        quizzesCompleted: 0,
        currentStreak: user.currentStreak || 0,
        badgesEarned: user.badgesEarned || 0,
        scoresByDate: [],
        scoresBySubject: {},
        streakCalendar: [],
        recentAttempts: []
      }
    }
  };
};
