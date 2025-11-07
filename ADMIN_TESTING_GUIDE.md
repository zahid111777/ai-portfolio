# Admin Panel Testing Guide

## ✅ Testing All Dynamic Fields - Step by Step

### Prerequisites:
- ✅ Backend running on: http://localhost:8000
- ✅ Admin panel running on: http://localhost:3001
- ✅ Login credentials: admin / admin123

---

## 1. 🔐 **Login Section** - Test Authentication

**Test Steps:**
1. Go to http://localhost:3001
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click "Sign In"

**Expected Result:**
- ✅ Should redirect to Dashboard
- ✅ No error messages
- ✅ Header shows "Online" badge
- ✅ Dark mode toggle visible

**Status:** 🟢 PASS / 🔴 FAIL

---

## 2. 👤 **About Section** - Test Profile Management

**Navigate:** Click "About" in sidebar

### Test 2.1: View Profile Information
**Expected Data:**
- Name: Zahid Rashid
- Title: Full Stack Developer
- Description: Paragraph about experience
- Profile picture displayed
- Statistics: Years Experience, Projects, Skills, Certifications

**Status:** 🟢 PASS / 🔴 FAIL

### Test 2.2: Edit Profile Information
1. Click "Edit" on Profile Information card
2. Modify the "Title" field
3. Click "Save Changes"

**Expected Result:**
- ✅ Success message appears
- ✅ Changes are saved
- ✅ Data persists after refresh

**Status:** 🟢 PASS / 🔴 FAIL

### Test 2.3: Upload Profile Picture
1. Click "Choose File" in Profile Picture section
2. Select an image file
3. Click "Upload"

**Expected Result:**
- ✅ Image preview updates
- ✅ Success message shows
- ✅ Image saved to server

**Status:** 🟢 PASS / 🔴 FAIL

### Test 2.4: Manage Career Highlights
**Add Highlight:**
1. Click "Add Highlight" button
2. Fill in Icon (emoji) and Text
3. Click "Save"

**Edit Highlight:**
1. Click "Edit" on existing highlight
2. Modify text
3. Click "Save"

**Delete Highlight:**
1. Click "Delete" on a highlight
2. Confirm deletion

**Expected Results:**
- ✅ Can add new highlights
- ✅ Can edit existing highlights
- ✅ Can delete highlights
- ✅ Order is maintained

**Status:** 🟢 PASS / 🔴 FAIL

---

## 3. 💼 **Experience Section** - Test Work Experience Management

**Navigate:** Click "Experience" in sidebar

### Test 3.1: View All Experiences
**Expected:**
- List of all work experiences
- Each shows: Company, Position, Duration, Description
- Technologies listed

**Status:** 🟢 PASS / 🔴 FAIL

### Test 3.2: Add New Experience
1. Click "Add Experience" button
2. Fill in all fields:
   - Company name
   - Position
   - Start date
   - End date (or check "Currently working")
   - Description
   - Technologies (comma-separated)
3. Click "Save"

**Expected Result:**
- ✅ New experience appears in list
- ✅ Success message shown
- ✅ Data saved to database

**Status:** 🟢 PASS / 🔴 FAIL

### Test 3.3: Edit Experience
1. Click "Edit" on an experience
2. Modify any field
3. Click "Save"

**Expected Result:**
- ✅ Changes saved successfully
- ✅ Updated data displayed

**Status:** 🟢 PASS / 🔴 FAIL

### Test 3.4: Delete Experience
1. Click "Delete" on an experience
2. Confirm deletion

**Expected Result:**
- ✅ Experience removed from list
- ✅ Confirmation dialog shown
- ✅ Data deleted from database

**Status:** 🟢 PASS / 🔴 FAIL

---

## 4. 🚀 **Projects Section** - Test Portfolio Projects

**Navigate:** Click "Projects" in sidebar

### Test 4.1: View All Projects
**Expected:**
- Grid/list of projects
- Each shows: Title, Description, Technologies, Links
- Featured status visible

**Status:** 🟢 PASS / 🔴 FAIL

### Test 4.2: Add New Project
1. Click "Add Project" button
2. Fill in all fields:
   - Title
   - Description
   - Technologies (array)
   - GitHub URL
   - Live Demo URL
   - Image URL
   - Featured checkbox
3. Click "Save"

**Expected Result:**
- ✅ Project added successfully
- ✅ Appears in project list
- ✅ All data displayed correctly

**Status:** 🟢 PASS / 🔴 FAIL

### Test 4.3: Upload Project Image
1. Click "Upload Image" in project form
2. Select image file
3. Verify preview

**Expected Result:**
- ✅ Image uploads successfully
- ✅ Preview shown
- ✅ URL populated in form

**Status:** 🟢 PASS / 🔴 FAIL

### Test 4.4: Edit Project
1. Click "Edit" on a project
2. Modify fields
3. Click "Save"

**Expected Result:**
- ✅ Changes saved
- ✅ Updated immediately

**Status:** 🟢 PASS / 🔴 FAIL

### Test 4.5: Delete Project
1. Click "Delete" on a project
2. Confirm

**Expected Result:**
- ✅ Project removed
- ✅ Confirmation shown

**Status:** 🟢 PASS / 🔴 FAIL

---

## 5. ⚡ **Skills Section** - Test Skills Management

**Navigate:** Click "Skills" in sidebar

### Test 5.1: View All Skills
**Expected:**
- Skills grouped by category
- Category tabs: All, AI/ML Frameworks, Programming Languages, Cloud & DevOps, Data & Databases
- Each skill shows: Name, Proficiency bar, Edit/Delete buttons

**Status:** 🟢 PASS / 🔴 FAIL

### Test 5.2: Filter by Category
1. Click different category tabs
2. Verify filtering works

**Expected Result:**
- ✅ Skills filter by category
- ✅ Correct count shown in tabs

**Status:** 🟢 PASS / 🔴 FAIL

### Test 5.3: Add New Skill
1. Click "Add Skill" button
2. Fill in:
   - Skill name
   - Category (dropdown)
   - Proficiency (0-100 slider)
   - Icon (optional)
3. Click "Save"

**Expected Result:**
- ✅ Skill added successfully
- ✅ Appears in correct category
- ✅ Proficiency bar displays correctly

**Status:** 🟢 PASS / 🔴 FAIL

### Test 5.4: Edit Skill
1. Click "Edit" on a skill
2. Modify proficiency level
3. Click "Save"

**Expected Result:**
- ✅ Proficiency updated
- ✅ Bar animates to new value

**Status:** 🟢 PASS / 🔴 FAIL

### Test 5.5: Delete Skill
1. Click "Delete" on a skill
2. Confirm deletion

**Expected Result:**
- ✅ Skill removed
- ✅ Category count updates

**Status:** 🟢 PASS / 🔴 FAIL

---

## 6. 📧 **Contact Section** - Test Contact Information

**Navigate:** Click "Contact" in sidebar

### Test 6.1: View Contact Info
**Expected:**
- Email displayed
- Phone number
- Location
- Social media links (LinkedIn, GitHub, Twitter)

**Status:** 🟢 PASS / 🔴 FAIL

### Test 6.2: Edit Contact Info
1. Click "Edit" button
2. Modify any field
3. Click "Save"

**Expected Result:**
- ✅ Changes saved
- ✅ Success message shown

**Status:** 🟢 PASS / 🔴 FAIL

---

## 7. 💬 **Messages Section** - Test Contact Messages

**Navigate:** Click "Messages" in sidebar

### Test 7.1: View Messages
**Expected:**
- List of contact form submissions
- Shows: Name, Email, Subject, Message, Date
- Unread/Read status

**Status:** 🟢 PASS / 🔴 FAIL

### Test 7.2: Mark as Read
1. Click on unread message
2. Click "Mark as Read"

**Expected Result:**
- ✅ Status changes to read
- ✅ Visual indicator updates

**Status:** 🟢 PASS / 🔴 FAIL

### Test 7.3: Delete Message
1. Click "Delete" on a message
2. Confirm deletion

**Expected Result:**
- ✅ Message removed from list

**Status:** 🟢 PASS / 🔴 FAIL

### Test 7.4: Filter Unread Only
1. Toggle "Show Unread Only" filter
2. Verify filtering

**Expected Result:**
- ✅ Shows only unread messages when enabled

**Status:** 🟢 PASS / 🔴 FAIL

---

## 8. 🌙 **Dark Mode** - Test Theme Toggle

### Test 8.1: Toggle Dark Mode
1. Click sun/moon icon in header
2. Verify theme changes

**Expected Result:**
- ✅ Background changes to dark
- ✅ Text becomes light
- ✅ Sidebar updates
- ✅ Cards change color
- ✅ All elements readable

**Status:** 🟢 PASS / 🔴 FAIL

### Test 8.2: Theme Persistence
1. Enable dark mode
2. Refresh page
3. Check if dark mode persists

**Expected Result:**
- ✅ Theme remembered after refresh

**Status:** 🟢 PASS / 🔴 FAIL

---

## 9. 🔄 **Data Persistence** - Test Database

### Test 9.1: Refresh Test
1. Make changes in any section
2. Refresh browser (F5)
3. Verify changes persist

**Expected Result:**
- ✅ All changes saved
- ✅ Data loads after refresh

**Status:** 🟢 PASS / 🔴 FAIL

### Test 9.2: Logout & Login
1. Logout from admin
2. Login again
3. Navigate to sections
4. Verify all data is intact

**Expected Result:**
- ✅ Data persists across sessions

**Status:** 🟢 PASS / 🔴 FAIL

---

## 10. 📱 **Responsive Design** - Test Mobile View

### Test 10.1: Mobile Menu
1. Resize browser to mobile width
2. Check if hamburger menu appears
3. Test sidebar toggle

**Expected Result:**
- ✅ Hamburger icon visible on mobile
- ✅ Sidebar slides in/out
- ✅ Overlay appears when open

**Status:** 🟢 PASS / 🔴 FAIL

---

## 🐛 **Error Handling Tests**

### Test 11.1: Invalid Data
1. Try to save empty required fields
2. Try invalid email format
3. Try invalid URL format

**Expected Result:**
- ✅ Validation errors shown
- ✅ Form doesn't submit
- ✅ Helpful error messages

**Status:** 🟢 PASS / 🔴 FAIL

### Test 11.2: Network Error
1. Stop backend server
2. Try to save data
3. Check error handling

**Expected Result:**
- ✅ User-friendly error message
- ✅ No app crash

**Status:** 🟢 PASS / 🔴 FAIL

---

## 📊 **Test Summary**

**Total Tests:** 30+

**Passed:** _____ / 30
**Failed:** _____ / 30
**Not Tested:** _____ / 30

---

## 🔧 **Common Issues & Fixes**

### Issue: "Failed to load skill details"
**Fix:** Backend not running
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### Issue: Login fails
**Fix:** Check credentials or database
```bash
cd backend/app
python create_admin.py
```

### Issue: Images not uploading
**Fix:** Check uploads folder permissions
```bash
cd backend
mkdir uploads
```

### Issue: Dark mode not working
**Fix:** Clear browser cache
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## ✅ **FINAL CHECKLIST**

- [ ] All CRUD operations work (Create, Read, Update, Delete)
- [ ] Images upload successfully
- [ ] Dark mode toggles correctly
- [ ] Data persists after refresh
- [ ] Forms validate properly
- [ ] Error messages display
- [ ] Success messages show
- [ ] Loading states appear
- [ ] Mobile responsive works
- [ ] All API endpoints respond

---

**Tested By:** _________________
**Date:** _________________
**Environment:** Development
**Browser:** _________________
