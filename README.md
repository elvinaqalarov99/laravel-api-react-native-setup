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
    <li>Run php artisan key:generate, to generate your own laravel app key.</li>
    <li>Run cp .env.example .env, to have your environment variables.</li>
    <li>Paste your current IP in .env file as I mentioned above.</li>
    <li>Run php artisan migrate</li>
    <li>Run php artisan serve --host {YOUR_IP} --port="8000", to serve it in different host and port</li>
    <li>Go to your database and add some categories. For now I did not handled adding categories from admin panel, it was not a part of my goal I thought</li>
</ul>

<h5>Now you can open your emulator or scan QR Code to open the app</h5>
