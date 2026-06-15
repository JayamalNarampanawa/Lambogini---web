# Draftly Frontend (Immersive 3D Showroom)

This frontend is a React app (CRA + CRACO) that provides an immersive 3D showroom experience using React Three Fiber and Tailwind CSS.

Quick start (frontend):

1. Install dependencies
```bash
yarn install
```

2. Start the dev server
```bash
yarn start
```

3. Open http://localhost:3000

Backend API

- The backend is a FastAPI server located in the `backend/` folder. It expects `MONGO_URL` and `DB_NAME` environment variables.
- Default booking endpoint: `POST http://localhost:8000/api/bookings`

Run backend (example):
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Notes

- This project uses React Three Fiber for 3D scenes. If you run into WebGL/context errors, ensure your GPU/drivers support WebGL2 and that `three` is the correct version.
- The customizer saves a configuration locally to `localStorage` when you click "Save Configuration".
- The gallery includes an immersive 3D tunnel accessible via the "Enter 3D Gallery" button.

Adding a real 3D car model

- To use a real GLTF/GLB model, place the file at `public/models/car.glb`.
- The showroom will automatically attempt to load `/models/car.glb`. If the file is missing, the app falls back to a procedural placeholder car.
- For production, consider compressing the GLB with Draco and serving optimized textures. If you use Draco, add the Draco decoder and configure `useGLTF` loader accordingly.

Production notes

- To optimize three.js assets for production: compress textures (KTX2), use Draco compression for meshes, and generate LODs for complex models.
- Consider adding a build-time asset pipeline to pre-convert and optimize models.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
