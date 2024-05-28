<h1>Simple ChatBot</h1>
<hr>
<p>This project is a simple chatbot built using Natural Language Processing (NLP) techniques. The implementation leverages libraries such as NLTK and Django in Python.</p>

<h4>Features</h4>
<ul>
    <li>Natural Language Understanding using NLTK</li>
    <li>Customizable intents and responses</li>
    <li>Web interface built with Django</li>
</ul>

<h4>Requirements</h4>
<ul>
    <li>Python 3.x</li>
    <li>NLTK</li>
    <li>Django</li>
    <li>TensorFlow</li>
    <li>TFLearn</li>
    <li>SpaCy</li>
</ul>

<h4>Installation</h4>
<ol>
    <li>Clone the repository:</li>
        <code>git clone https://github.com/kumarakash94/chatbot.git</code><br>
        <code>cd chatbot</code>
    <li>Create a virtual environment:</li>
        <code>python -m venv venv</code><br>
        <code>source venv/bin/activate</code><br>
        <code>On Windows, use `venv\Scripts\activate`</code><br>
    <li>Install the dependencies:</li>
        <code>pip install -r requirements.txt</code>
    <li>Download NLTK data:</li>
        <code>import nltk</code>
        <code>nltk.download('punkt')</code>
    <li>Download SpaCy model:</li>
        <code>python -m spacy download en_core_web_sm</code>
</ol>

<h4>Usage</h4>
<ol>
    <li>Training the model:</li>
    <ul>
        <li>Prepare your training data in a JSON format with intents and response.</li>
    </ul>
    <li>Run the Django server:</li>
    <ul>
        <li>Make migrations and migrate the database:</li>
            <code>python manage.py makemigrations</code><br>
            <code>python manage.py migrate</code><br>
        <li>Start the Django development server:</li>
        <code>python manage.py runserver</code>
    </ul>
</ol>

<h3>Contribution</h3>
<p>Feel free to open issues or submit pull requests with improvements.</p>
