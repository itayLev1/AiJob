const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, '../data/userProfile.json');

function getUserProfile() {
  try {
    const data = fs.readFileSync(profilePath);
    return JSON.parse(data);
  } catch {
    return {
      name: '',
      location: '',
      techStack: [],
      experience: '',
      remote: true
    };
  }
}

function updateUserProfile(newData) {
  const current = getUserProfile();
  const updated = { ...current, ...newData };
  fs.writeFileSync(profilePath, JSON.stringify(updated, null, 2));
  return updated;
}

module.exports = { getUserProfile, updateUserProfile };
