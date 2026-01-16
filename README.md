**ProjectMate** is a technical collaboration platform developed for the student community at Nirma University. The system centralizes the process of team formation by connecting students across diverse engineering disciplines through a unified digital interface.

**Technical Problem**     
                                      Multidisciplinary projects within the university often struggle with recruitment. There is no formal system to connect software developers with hardware engineers or designers outside of immediate social circles. This lack of visibility leads to suboptimal team composition and project stagnation.

**System Features**

i)**Student Identity**

1)Verified Profiles: Users provide branch and graduation year data to establish campus identity.

2)Portfolio Integration: Profiles link directly to GitHub and LinkedIn to allow for technical verification.

3)Skill Mapping: Users list specific technologies and roles to facilitate targeted recruitment.

ii)**Project Management**

1)Project Posting: Leads can define project objectives, required tech stacks, and specific vacancies.

2)Discovery Feed: A centralized repository of active projects available for all authenticated users to browse.

3)Team Dashboard: Project creators have access to an inbox for reviewing, accepting, or declining applicant requests.

iii)**Real-Time Interaction**

1)Project Lounges: A real-time chat interface is generated for every project, allowing accepted members and leads to communicate instantly.

2)Live Notifications: Status updates for applications and new messages are synchronized across the platform.

🏗 **System Overview**

ProjectMate digitizes the campus builder ecosystem. It allows students to move beyond informal messaging groups by providing a centralized repository where project leads can recruit specific talent and students can discover projects aligned with their technical skills.

**Key Functionality**

1)**University Identity:** Profiles are categorized by branch, graduation year, and technical expertise.

2)**Portfolio Verification**: Direct integration with GitHub and LinkedIn for skill validation.

3)**Recruitment Pipeline**: Project leads manage a dedicated inbox to review, accept, or decline team applicants.

4)**Real-time Collaboration**: Dedicated project "lounges" providing instant messaging for accepted team members.

**Infrastructure**

1)The application utilizes a serverless architecture to ensure high availability and low latency.

2)Database Security: Firestore Security Rules are implemented to restrict data modification to authenticated users.

3)Hosting: Deployed via Firebase Hosting for global content delivery and SSL encryption.

4)Performance: Optimized through Vite for fast builds and minified production assets.

**Technical Architecture**

1)The platform utilizes a serverless architecture to maintain high performance and real-time synchronization across the university network.

2)Real-time Synchronization: Leverages Firestore onSnapshot listeners to update project feeds, application statuses, and chat messages without page refreshes.

3)Security Model: Implements Firestore Security Rules to ensure that data modification is restricted to authenticated users and authorized project leads.

4)Data Integrity: Maintains a structured relationship between the users, projects, applications, and chats collections to ensure a consistent user experience.

## 🛠 **Technology Stack**

| **Layer** | **Technology** | **Purpose** |
| :--- | :--- | :--- |
| **Frontend** | React.js | UI Components & State |
| **Styling** | Tailwind CSS | Responsive Design |
| **Database** | Firestore | Real-time Data Sync |
| **Auth** | Firebase Auth | Secure User Login |
| **Icons** | Lucide-React | Scalable Vector Icons |

🚀 **Local Setup**

1)**Clone the Repository**

git clone https://github.com/lakshya2505/ProjectMate.git

cd ProjectMate

2)**Install Dependencies**

npm install

3)**Environment Configuration**

Create a **.env** file in the root directory and add your Firebase configuration keys

4)**Launch Application**

npm run dev

**LIVE HOSTED WEBSITE LINK-**:


https://projectmate-1fb9c.firebaseapp.com


**DEMO VIDEO LINK**-:


https://youtu.be/ZYhh-YNeUks?si=0QAU40pjx-rUAPJT


**Visuals (Screenshots)**
<img width="1709" height="948" alt="Screenshot 2025-12-31 at 12 00 01 AM" src="https://github.com/user-attachments/assets/8f5f0078-cc00-4d77-aebc-0339e064f417" />
<img width="3420" height="5258" alt="screencapture-projectmate-1fb9c-web-app-login-2025-12-31-00_02_40" src="https://github.com/user-attachments/assets/619c21dc-c057-46ab-857d-7079df2d4516" />
<img width="3420" height="3378" alt="screencapture-projectmate-1fb9c-web-app-projects-2025-12-31-00_03_07" src="https://github.com/user-attachments/assets/a5a50c9e-f213-452d-b916-8cab6fa51ff0" />
<img width="3420" height="3394" alt="screencapture-projectmate-1fb9c-web-app-create-2025-12-31-00_03_25" src="https://github.com/user-attachments/assets/b001f6dd-5019-4e2f-8951-63b796af5b34" />
<img width="3420" height="1921" alt="screencapture-projectmate-1fb9c-web-app-profile-2025-12-31-00_03_39" src="https://github.com/user-attachments/assets/942a3092-2f8b-47e5-b249-96c113c5857c" />




