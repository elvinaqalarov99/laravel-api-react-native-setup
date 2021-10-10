<h1>React native + Laravel API Setup</h1>

<h3>To make an app up and running you should pass steps below:</h3>
<p>Note: I am not gonna delete some components to clean structure, I'll leave them as you could use them.</p>

<h4>In App</h4>
<p>Move to app folder</p>
<ul>
    <li>Paste your current IP in app/axios/axios.ts file. This is the url of your backend. Because if you run your backend as localhost, emulators won't undersand it, as they will refer localhost as itself, cause it is also using localhost.</li>
    <li>Run npm install</li>
    <li>Run npm start</li>
</ul>

<h4>In Backend</h4>
<p>Move to backend folder</p>
<ul>
    <li>Run composer install</li>
    <li>Run npm install</li>
    <li>Run npm run dev, to generate public app.css and app.js files, or npm run watch to watch for changes done in app.scss or app.js in resources folder.</li>
    <li>Run php artisan key:generate, to generate your own laravel app key.</li>
    <li>Run cp .env.example .env, to have your environment variables.</li>
    <li>Paste your current IP in .env file as I mentioned above.</li>
    <li>Create database named app in your MYSQL database</li>
    <li>Run php artisan migrate</li>
    <li>Run php artisan serve --host {YOUR_IP} --port="8000", to serve it in different host and port</li>
    <li>Go to {YOUR_IP:8000}/register to register an admin user then add some categories to fetch them from backend</li>
</ul>
<p>Note: For now as per categories, I used expo's fontawesome5 icons. Hence please search only for those ones to get the point, then change in code the layout you want</p>

<h4>Now you can open your emulator or scan QR Code to open the app</h4>

<h4>Note: Please, if I forgot something, contact me for the support :)</h4>
