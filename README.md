Setup:
1. Make sure your npm and node versions are up-to-date.
2. Navigate to the root directory of the local clone of the repo.
3. Run `npm i` in a terminal to install the dependencies.
4. Navigate to /vite-project and run `npm i` to install the dependencies for the frontend.
5. Install PostgreSQL on your system if not installed already.
6. Navigate to /backend and run Elementary.sql, Middle.sql and High.sql scripts using Postgres to create the three required databases.
7. After ensuring you're in the root directory of the local repo, create a new file named `.env` and copy-paste the contents from `.env.example`.
8. In the .env file, replace `username`, `password` and `port` with your Postgres username, password and port and save the file.


To run:
1. Start the Fastapi application: In the root directory of the local repo, run `uvicorn backend.main:app` in a terminal.
2. Start the frontend development server: After navigating to /vite-project in a terminal, run `npm run dev`, which starts a development server that can open the frontend application in a browser.
