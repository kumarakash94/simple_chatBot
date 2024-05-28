intents = {
    'greeting': ['hello', 'hi', 'hey'],
    'farewell': ['bye', 'goodbye'],
    'address': ['location','address','office location', 'office address'],
    'contact':['contact'],
}
responses = {
    'greeting': "Hello, {name}! How can I assist you today?",
    'farewell': 'Goodbye, {name}! Have a great day!',
    'contact': "Your address 123",
    'address': ("Address Line 1," 
                "Address line 2." 
                "Address Line 3"
                "<br>"
                '<a href="https://example.com/" target="_blank" style="text-decoration:none; border:1px solid #fff; color:#fff; padding:2px 4px; margin-top:5px; display:block; width:fit-content; text-shadow:0px 0px 4px #fff; border-radius:10px;">Get In touch</a>'
                ),
}
