from django.http import JsonResponse
import json
from django.shortcuts import render
# Create your views here.
from django.shortcuts import render
import spacy
from django.views.decorators.csrf import csrf_exempt
from .intents_response import intents, responses
# Loading Spacy
nlp = spacy.load('en_core_web_sm')
user_name = None

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def chatbox(request):
    global user_name
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('message')[0].get('content')
        # Ask for the user's name
        # if not user_name:
        #     user_name = user_input
        #     response_message = f"Nice to meet you, {user_name.upper()}! How can I help you today?"
        #     return JsonResponse({'message': response_message})
        # Process the message
        doc = user_input.lower().split()
        detected_intent = None
        for intent, keywords in intents.items():
            for word in doc:
                if word in keywords:
                    detected_intent = intent
                    break
            if detected_intent:
                break
        if detected_intent:
            if detected_intent == 'address':
                response_message = responses.get(detected_intent, "I'm not sure how to respond to that.")
            else:
                response_message = responses.get(detected_intent, "I'm not sure how to respond to that.").format(name=user_name)
        else:
            response_message = "I'm sorry, I didn't understand your request."
        return JsonResponse({'message': response_message})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)