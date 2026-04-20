const leaderboardMock = Array.from({ length: 15 }, (_, i) => ({
  _id: `user_${i + 1}`,
  rank: i + 1,
  name: ['Aarav Singh','Priya Sharma','Rohan Mehta','Sneha Patel','Karan Joshi','Divya Nair','Arjun Verma','Pooja Rao','Rahul Das','Ananya Gupta','Vikas Kumar','Neha Mishra','Siddharth Jain','Riya Chopra','Manish Tyagi'][i],
  totalPoints: [2450,2200,1980,1750,1600,1450,1300,1150,1000,900,780,650,520,400,280][i],
  badgesCount: [6,5,5,4,4,3,3,3,2,2,2,1,1,1,0][i],
  weeklyChange: ['+3','+1','=','-1','+2','=','+1','-2','=','+1','-1','=','+2','-1','='][i],
}))

export default leaderboardMock
