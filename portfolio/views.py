import os

from django.shortcuts import render


def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    context = {
        'emailjs_service_id': os.getenv('EMAILJS_SERVICE_ID', ''),
        'emailjs_template_id': os.getenv('EMAILJS_TEMPLATE_ID', ''),
        'emailjs_public_key': os.getenv('EMAILJS_PUBLIC_KEY', ''),
    }
    return render(request, 'contact.html', context)
