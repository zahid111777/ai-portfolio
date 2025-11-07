const fs = require('fs-extra');
const path = require('path');

async function combineBuilds() {
  try {
    const adminBuildPath = path.join(__dirname, '..', 'admin', 'build');
    const mainBuildPath = path.join(__dirname, '..', 'build');
    const adminDestPath = path.join(mainBuildPath, 'admin');

    // Ensure admin build exists
    if (await fs.pathExists(adminBuildPath)) {
      // Create admin directory in main build
      await fs.ensureDir(adminDestPath);
      
      // Copy admin build to main build/admin
      await fs.copy(adminBuildPath, adminDestPath);
      
      console.log('✅ Admin build copied to build/admin');
    } else {
      console.log('⚠️ Admin build not found, skipping...');
    }
  } catch (error) {
    console.error('❌ Error combining builds:', error);
    process.exit(1);
  }
}

combineBuilds();