// Clear localStorage script
console.log('Clearing localStorage...');

// Remove all user-related data
localStorage.removeItem('registeredUsers');
localStorage.removeItem('userData');
localStorage.removeItem('currentUser');
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('profileCompleted');
localStorage.removeItem('profileSkipped');

console.log('User data cleared successfully!');
console.log('You can now create new accounts.');

// Redirect to home page
window.location.href = '/';